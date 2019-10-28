"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_routes_1 = __importDefault(require("next-routes"));
const appRoutes = new next_routes_1.default()
    .add('index', '/:slug+');
const { Link: NextRoutesLink, Router } = appRoutes;
exports.Router = Router;
const Link = NextRoutesLink;
exports.Link = Link;
exports.default = appRoutes;
