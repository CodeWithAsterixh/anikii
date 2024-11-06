import {
  GithubLogo,
  LinkedinLogo,
  Mailbox,
  Phone,
  XLogo,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-base-black/10 dark:bg-base-black text-base-black dark:text-base-white flex flex-col items-center justify-center gap-10 pt-10 bottom-0">
      <div className="w-full px-5 md:px-20">
        <div className="w-full flex flex-col md:flex-row md:justify-between gap-9">
          <div className="w-full max-w-[170px] flex flex-col gap-3">
            <b className="text-2xl">Quick Links</b>
            <Link href="/" className="text-gray-800 dark:text-gray-300 text-md">
              Home
            </Link>
          </div>
          <div className="w-full max-w-[150px] flex flex-col gap-3">
            <b className="text-2xl">About</b>
            <Link
              href="aster-develops/vercel.app/About"
              className="text-gray-800 dark:text-gray-300 text-md"
            >
              About Us
            </Link>
          </div>
          <div className="w-full max-w-[170px] flex flex-col gap-3">
            <b className="text-2xl">More</b>
            <Link href="#" className="text-gray-800 dark:text-gray-300 text-md">
              Pricacy policy
            </Link>
            <Link
              href="#"
              className="text-gray-800 dark:text-gray-300 text-md w-full max-w-[50rem]"
            >
              Terms & Conditions
            </Link>
          </div>
          <div className="w-full max-w-[300px] flex flex-col gap-3">
            <b className="text-2xl">Contacts</b>
            <p className="text-gray-800 dark:text-gray-300 w-full max-w-[15rem] text-md">
              Do you want to support asterixh or have any questions? get in
              touch
            </p>
            <a
              href="mailto:asterixhco@gmail.com"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-md"
            >
              <Mailbox className="font-bold text-base-black dark:text-base-white" />{" "}
              <span>Email:</span> asterixhco@gmail.com
            </a>
            <a
              href="tel:+2348109080838"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-md"
            >
              <Phone />
              <span>Phone:</span> +234 810 908 0838
            </a>
            <a
              href="www.github.com/p34-pac"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-md"
            >
              <GithubLogo />
              <span>Github:</span> p34-pac
            </a>

            <a
              href="https://www.linkedin.com/in/paul-peter-eyinnaya?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-md"
            >
              <LinkedinLogo />
              <span>LinkedIn:</span> Peter Paul
            </a>
            <a
              href="https://x.com/AsterixhThanks?t=URfI8qwSIK1SbDijca99BA&s=09"
              className="flex items-center gap-2 text-gray-800 dark:text-gray-300 text-md"
            >
              <XLogo />
              <span>X:</span> Peter Paul
            </a>
          </div>
        </div>
      </div>
      <div className="py-5 border-t-2 w-full text-center border-gray-600 text-gray-500">
        Copyright © 2024 Asterixh
      </div>
    </footer>
  );
}
