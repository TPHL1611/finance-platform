import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { accounts, insertAccountSchema } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";

import { createId } from "@paralleldrive/cuid2";
import { z } from "zod";

const app = new Hono()
    .get("/", clerkMiddleware(), async (c) => {
        const auth = getAuth(c);

        if (!auth?.userId) {
            return c.json({ error: "Unauthorized" }, 401);
        }

        const data = await db
            .select({ id: accounts.id, name: accounts.name })
            .from(accounts)
            .where(eq(accounts.userId, auth.userId));
        return c.json({ data });
    })
    .get(
        "/:id",
        zValidator("param", z.object({ id: z.string() })),
        clerkMiddleware(),
        async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.valid("param");

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            if (!id) {
                return c.json({ error: "Missing id" }, 400);
            }

            const [data] = await db
                .select({
                    id: accounts.id,
                    name: accounts.name,
                })
                .from(accounts)
                .where(and(eq(accounts.id, id), eq(accounts.userId, auth.userId)));

            if (!data) {
                return c.json({ error: "Not found" }, 404);
            }

            return c.json({ data });
        }
    )
    .post(
        "/",
        clerkMiddleware(),
        zValidator(
            "json",
            insertAccountSchema.pick({
                //Thêm method "pick" để chọn chỉ lấy các trường thông tin cần thiết
                name: true,
            })
        ),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            // Thêm dấu [] để trả về data đầu tiên trong array <=> data: data[0] ở return
            // Không thêm [] sẽ trả về 1 array
            const [data] = await db
                .insert(accounts)
                .values({
                    id: createId(),
                    userId: auth.userId,
                    ...values,
                })
                .returning();

            return c.json({ data });
        }
    )
    .post(
        "/bulk-delete",
        clerkMiddleware(),
        zValidator(
            "json",
            z.object({
                ids: z.array(z.string()),
            })
        ),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            const data = await db
                .delete(accounts)
                .where(
                    and(
                        eq(accounts.userId, auth.userId), // Kiểm tra id người dùng có trùng khớp
                        inArray(accounts.id, values.ids) // Kiểm tra giá trị được gửi lên có nằm trong data của account hay không
                    )
                )
                .returning({ id: accounts.id });

            // Luôn luôn trả về c.json, bên trong là 1 object
            return c.json({ data });
        }
    )
    .patch(
        "/:id",
        clerkMiddleware(),
        zValidator("param", z.object({ id: z.string().optional() })),
        zValidator("json", insertAccountSchema.pick({ name: true })),
        async (c) => {
            const auth = getAuth(c);
            const values = c.req.valid("json");
            const { id } = c.req.valid("param");

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            if (!id) {
                return c.json({ error: "Missing id" }, 400);
            }

            const [data] = await db
                .update(accounts)
                .set(values)
                .where(and(eq(accounts.userId, auth.userId), eq(accounts.id, id)))
                .returning();

            if (!data) {
                return c.json({ error: "Not found" }, 404);
            }

            return c.json({ data });
        }
    )
    .delete(
        "/:id",
        clerkMiddleware(),
        zValidator("param", z.object({ id: z.string().optional() })),
        async (c) => {
            const auth = getAuth(c);
            const { id } = c.req.valid("param");

            if (!auth?.userId) {
                return c.json({ error: "Unauthorized" }, 401);
            }

            if (!id) {
                return c.json({ error: "Missing id" }, 400);
            }

            const [data] = await db
                .delete(accounts)
                .where(and(eq(accounts.id, id), eq(accounts.userId, auth.userId)))
                .returning({ id: accounts.id });

            if (!data) {
                return c.json({ error: "Not found" }, 404);
            }
            return c.json({ data });
        }
    );

export default app;
