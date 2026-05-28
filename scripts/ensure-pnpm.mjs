const userAgent = process.env.npm_config_user_agent ?? "";

if (!userAgent.startsWith("pnpm/")) {
  console.error("This project uses pnpm. Run `pnpm install` instead of npm or yarn.");
  process.exit(1);
}
