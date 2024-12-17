import { getServerSession } from "next-auth";
import { redirect, RedirectType } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

const RedirectPage = async () => {
  const session = await getServerSession(options);

  if (session) {
    if (session.user.role === 'customer') redirect('/c/dashboard');
    else if (session.user.role === 'manager') redirect('/m/dashboard');
    else if (session.user.role === 'driver') redirect('/d/dashboard');
    else redirect('/');
  }
  redirect('/signin');
  return (
    <div>Redirecting</div>
  )
}

export default RedirectPage;