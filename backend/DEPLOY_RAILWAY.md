# Deploy backend lên Railway

Backend giữ Express + Prisma 7 + MySQL, chạy TypeScript bằng `tsx` như hiện tại.
Không cần sửa frontend, đổi schema, tạo migration mới hoặc dùng `db push` để deploy backend.

## Cấu hình service backend

| Thiết lập | Giá trị |
| --- | --- |
| Root Directory | `/backend` |
| Node | Node 24 LTS hoặc Node 22 từ 22.12 trở lên; khai báo trong `package.json` |
| Build Command | `npm run build` |
| Start Command | `npm start` |
| Healthcheck Path | `/` |

Build cần devDependencies để chạy TypeScript. Không đặt `NPM_CONFIG_OMIT=dev`
hoặc ép bỏ devDependencies ở bước cài đặt trước build. Prisma CLI và `tsx` nằm
trong dependencies để vẫn chạy được sau khi môi trường production loại devDependencies.

`npm start` chạy migration trước rồi mới khởi động server. Không cần thêm một
pre-deploy command chạy migration lần nữa với cấu hình này.

Server lắng nghe `0.0.0.0` và cổng `PORT` Railway cấp. Không cần tự đặt PORT=4000
trên Railway. Endpoint `/` kiểm tra HTTP; không thay thế kiểm tra kết nối database.

## Variables của service backend

```dotenv
DATABASE_URL=${{MySQL.MYSQL_URL}}
NODE_ENV=production
FRONTEND_URL=https://your-frontend.example.com
JWT_ACCESS_SECRET=<chuỗi ngẫu nhiên đủ dài>
JWT_REFRESH_SECRET=<chuỗi ngẫu nhiên khác>
```

`MySQL` phải đúng tên service database của bạn. Tạo variable tham chiếu trên
service backend; biến của service MySQL không tự có trong backend.
`FRONTEND_URL` là origin chính xác, không có đường dẫn hay dấu `/` cuối.

CLI Prisma và runtime đều lấy cùng `DATABASE_URL`. Không cần cấu hình thêm
MYSQLHOST/MYSQLPORT/MYSQLUSER/MYSQLPASSWORD/MYSQLDATABASE cho backend.
Runtime chuyển scheme `mysql://` sang `mariadb://` cho bộ phân tích URL của driver;
Prisma CLI vẫn nhận nguyên URL `mysql://`.

Client generate không cần database hoặc secret ở thời điểm build. Migration và
runtime vẫn bắt buộc có DATABASE_URL thật. URL có hostname nội bộ Railway chỉ
truy cập được trong mạng Railway; không dùng nó để chạy migration từ máy cá nhân.

Cookie refresh và CSRF dùng Secure + SameSite=None trong production HTTPS;
development giữ SameSite=Lax và không bắt buộc HTTPS. Luồng nghiệp vụ không đổi.

## Lệnh kiểm tra từ thư mục project

Dùng Node 22.12+ trong nhánh 22 hoặc Node 24, sau đó:

```sh
cd backend
npm ci --include=dev
npm run prisma:validate
npm run build
```

Trong môi trường có DATABASE_URL đúng và truy cập được database:

```sh
npm run migrate:status
npm start
```

Chạy riêng migration khi cần:

```sh
npm run migrate:deploy
```

Tên config là `prisma7.config.ts`, nên khi gọi Prisma trực tiếp luôn truyền
`--config prisma7.config.ts`. Các npm script đã có sẵn tham số này.

## Migration hoa/thường và database đã deploy lỗi

Đã sửa migration `20260906042806_update_product_credential`: câu DROP INDEX
tham chiếu `productcredential` trong khi bảng được tạo tên `ProductCredential`.
Giữ đúng tên trong schema và lịch sử: `Product`, `User`, `Cart`, `CartItem`,
`ProductCredential`, `OrderItem`, `orders`, `refresh_tokens`. Bảng `order_items`
là tên lịch sử được thay thế bởi `OrderItem`, không phải lỗi casing.

Database mới, trống: chạy `npm start` để áp dụng đủ 12 migration.

Database đã lỗi migration: chỉ sửa file rồi redeploy có thể vẫn gặp P3009.
MySQL có thể đã thực hiện một phần DDL trước khi lỗi; `migrate resolve` chỉ cập
nhật lịch sử, không tự hoàn tác SQL. Kiểm tra trước:

```sh
npm run migrate:status
```

```sql
SELECT migration_name, started_at, finished_at, rolled_back_at, logs
FROM _prisma_migrations
ORDER BY started_at;

SHOW CREATE TABLE ProductCredential;
SHOW CREATE TABLE order_items;
```

Lệnh SHOW trên dành cho trường hợp đang dừng ở migration nêu trên; sau khi toàn bộ
migration hoàn tất, `order_items` không còn tồn tại.

Hai hướng xử lý phụ thuộc trạng thái thực tế:

- Sau khi đã hoàn tác chính xác các thay đổi của migration thất bại, đánh dấu
  `--rolled-back`, rồi deploy lại.
- Sau khi đã hoàn thành và kiểm chứng toàn bộ SQL còn thiếu của chính migration
  thất bại, đánh dấu `--applied`, rồi deploy các migration tiếp theo.

Không chạy các lệnh resolve trước khi đáp ứng điều kiện tương ứng:

```sh
npx prisma migrate resolve --config prisma7.config.ts --rolled-back 20260906042806_update_product_credential
# HOẶC, chỉ sau khi đã hoàn thành đầy đủ migration bằng tay:
npx prisma migrate resolve --config prisma7.config.ts --applied 20260906042806_update_product_credential
```

File migration sửa casing có checksum khác phiên bản cũ. Với database đã áp dụng
thành công bản cũ trên Windows, không reset database để xóa cảnh báo lịch sử và
không chỉnh trực tiếp bảng `_prisma_migrations`. Cần đối chiếu lịch sử trước khi
tiếp tục `migrate dev` trên database đó.

Migration `20260906095418_update_order_item_snapshot` hiện có thao tác DROP TABLE
`order_items`. Migration `20260906042806_update_product_credential` cũng drop cột
`product_id`. Đây là SQL có sẵn, không thay đổi trong đợt sửa deploy. Nếu database
có dữ liệu ở các bảng/cột này và chưa áp dụng migration, phải xử lý bảo toàn dữ
liệu trước; không chạy reset hay deploy mù quáng trên database đó.

## Giới hạn của đợt sửa này

Không đổi frontend. API client hiện còn URL localhost và phần gọi refresh chưa
khớp route/validation cookie ở backend; đó là vấn đề tích hợp xác thực có sẵn,
không phải lỗi cài đặt hoặc migrate Railway. Cần xử lý riêng khi nối frontend
với backend đã deploy; lần sửa này không đổi API hay business logic đó.

## Tài liệu đối chiếu

- [Railway monorepo](https://docs.railway.com/deployments/monorepo)
- [Railway MySQL variables](https://docs.railway.com/databases/mysql)
- [Railway PORT và host](https://docs.railway.com/networking/troubleshooting/application-failed-to-respond)
- [Prisma config](https://docs.prisma.io/docs/orm/reference/prisma-config-reference)
- [Prisma migration recovery](https://www.prisma.io/docs/orm/prisma-migrate/workflows/patching-and-hotfixing)
