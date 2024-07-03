export { auth as middleware } from "@/auth";

/* export async function middleware(request: NextRequest) {
  const session = await auth();
  console.log(session);
  return NextResponse.redirect(new URL("/", request.url));
} */

export const config = {
  matcher: ["/customer", "/customer/:path*"],
};
