function ReservationFooter() {
  return (
    <footer>
      <div className="w-full flex flex-col items-center text-white bg-greyNavbar">
        <img
          src="https://tabitisrael.co.il/assets/images/tabit_white_yellow_ribbon.svg?v=4_11_1"
          alt="Tabit"
          className="w-[5rem] my-2 "
        />
        <div className="my-2">
          <span className="mx-1 text-sm">
            Book a place | Order a table | Tabit
          </span>
        </div>
        <div className="flex gap-5">
          <a
            href="https://legal.tabit.cloud/tabit-terms/il"
            className="underline text-sm"
          >
            Terms of Service
          </a>
          <a
            href="https://legal.tabit.cloud/tabit-privacy/il"
            className="underline text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="https://legal.tabit.cloud/accessibility-statement/il"
            className="underline text-sm"
          >
            Accessibility Statement
          </a>
        </div>
        <div className="text-center italic text-greyFooterText text-xs my-2">
          This site is protected by reCAPTCHA and the Google <br />
          <a className="underline"> Privacy Policy </a>and
          <a className="underline"> Terms of Service </a> apply.
        </div>
      </div>
    </footer>
  );
}

export default ReservationFooter;
