import Image from "next/image";
import Link from "next/link";
import Faqs from "./components/Faqs";
import Team from "./components/Team";
import ButtonLink from "./components/ButtonLink";

const helpList = [
    "Anxiety, stress, feeling overwhelmed",
    "Negative thought patterns",
    "Depression",
    "Not feeling like yourself",
    "Not wanting to get out of bed",
    "Relationship conflicts",
    "Marriage and relationship issues",
    "Trauma and PTSD",
    "Mood swings",
];

export default function Home() {
    return (
        <main className="main-wrapper">
            <div className="main-quiz">
                Is therapy right for me? Take the{" "}
                <Link href="/booking">quiz</Link>
            </div>
            <section className="section-intro">
                <div>
                    <h1>Virtual counseling from therapist</h1>
                    <p>
                        Choose a therapist who fits your needs and schedule
                        visits 5 days a week from whereever {`you're`} most
                        comfortable
                    </p>
                    <ButtonLink color="warning">
                        <Link className="link-no-style" href="/booking">
                            Find my therapist
                        </Link>
                    </ButtonLink>
                    <br /> <br />
                </div>
                <div>
                    <Image
                        alt="pic"
                        className="img-intro"
                        height={200}
                        width={200}
                        quality={100}
                        src="https://res.cloudinary.com/crimson-flamingo/image/upload/v1690913175/doctor/1.jpg"
                    />
                </div>
            </section>

            <section className="section-helplist">
                <h2>What our online therapists can help you with</h2>
                <ul className="ul-helplist">
                    {helpList.map((item) => (
                        <li className="li-helplist" key={item}>
                            {item}
                        </li>
                    ))}
                </ul>
                <h4>Did you know?</h4>
                <p>
                    You can access counseling whether you have insurance or not
                </p>
                <p>
                    The first hour consultation is <b>FREE</b> and $150 per
                    visit after.
                </p>
            </section>

            <section className="section-how">
                <div>
                    <h2>How online therapist works:</h2>
                    <p>Get care anytime, anywhere.</p>
                    <h2>Find your licensed therapist now</h2>
                    <ul className="ul-store">
                        <li>On our website</li>
                        <li>In the app</li>
                    </ul>
                    <br />
                    <Image
                        className="store"
                        width={150}
                        height={45}
                        alt="store"
                        src="https://res.cloudinary.com/crimson-flamingo/image/upload/v1690505969/icons/store.png"
                    />
                    <Image
                        className="store"
                        width={150}
                        height={45}
                        alt="store"
                        src="https://res.cloudinary.com/crimson-flamingo/image/upload/v1690505960/icons/store2.png"
                    />
                    <br />
                    <br />
                </div>
                <div>
                    <Image
                        className="store"
                        width={300}
                        height={300}
                        alt="store"
                        src="https://res.cloudinary.com/crimson-flamingo/image/upload/v1690514428/icons/mh-provider.png"
                    />
                </div>
            </section>

            <section className="section-testimonial">
                <h2>Real stories. Real people.</h2>
                <div style={{ color: "orange", fontSize: "2em" }}>
                    {"★★★★★"}
                </div>
                <div>
                    <p>
                        {`"The therapist that I met has helped me through so much
                        in these tough times. I am in a much happier place than
                        before."`}
                    </p>
                    <p>- Julia T.</p>
                    <ButtonLink color="warning">
                        <Link
                            className="link-no-style"
                            style={{ fontSize: "small" }}
                            href="/"
                        >
                            See more patient stories
                        </Link>
                    </ButtonLink>
                </div>
            </section>

            <section className="section-appointment">
                <h2>
                    Build a relationship with an experienced therapist of your
                    choice
                </h2>
                <Team />
                <p>Secure online communication or meet in person</p>
                <ButtonLink color="warning">
                    <Link href="/booking" className="link-no-style">
                        Schedule a visit now
                    </Link>
                </ButtonLink>
            </section>

            <section className="section-faq">
                <h2>FAQs</h2>
                <Faqs />
                <br />
            </section>
        </main>
    );
}
