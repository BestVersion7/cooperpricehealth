import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer>
            <div className="footer-main">
                <div>
                    <h4>Learn More</h4>
                    {[
                        "How it works",
                        "Quality care",
                        "Testimonials",
                        "Health Blog",
                    ].map((item) => (
                        <div key={item}>
                            <Link className="footer-link" href="/">
                                {item}
                            </Link>
                        </div>
                    ))}
                </div>
                <div>
                    <h4>About</h4>
                    {["Company", "Care providers", "Careers", "Investors"].map(
                        (item) => (
                            <div key={item}>
                                <Link className="footer-link" href="/">
                                    {item}
                                </Link>
                            </div>
                        )
                    )}
                </div>
                <div>
                    <h4>Support</h4>
                    {[
                        "Contact us",
                        "FAQs",
                        "Client login",
                        "Ethics and compliance",
                    ].map((item) => (
                        <div key={item}>
                            <Link className="footer-link" href="/">
                                {item}
                            </Link>
                        </div>
                    ))}
                </div>
                <div>
                    <h4>Connect with us</h4>
                    <Image
                        className="store"
                        width={100}
                        height={30}
                        alt="store"
                        src="https://res.cloudinary.com/crimson-flamingo/image/upload/v1690505969/icons/store.png"
                    />
                    <br />
                    <Image
                        className="store"
                        width={100}
                        height={30}
                        alt="store"
                        src="https://res.cloudinary.com/crimson-flamingo/image/upload/v1690505960/icons/store2.png"
                    />
                </div>
            </div>
            <hr />
            <br />
            <div className="footer-additional">
                {["Sitemap", "Privacy Policy", "Accessibility Statement"].map(
                    (item) => (
                        <div key={item}>
                            <Link className="footer-link" href="/">
                                {item}
                            </Link>
                        </div>
                    )
                )}
            </div>
            <br />
            <br />
        </footer>
    );
}
