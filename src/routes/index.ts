import { Router } from 'express';
import { AuthRoutes } from '../app/module/Auth/auth.routs';
import { UserRoutes } from '../app/module/user/user.routs';
import { ChapterRouts } from "../app/module/Chapter/chapter.routs";
import { BookRoutes } from "../app/module/Book/book.routs";
import { QuestionRoutes } from "../app/module/Question/question.routs";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: UserRoutes,
  },
  {
    path: "/",
    route: ChapterRouts,
  },
  {
    path: "/",
    route: BookRoutes,
  },
  {
    path: "/",
    route: QuestionRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;


