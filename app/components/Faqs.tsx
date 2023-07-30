"use client";

import { faq } from "./questionaire";

export default () => {
    const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        const card: any = document.getElementById(
            `faq-answer-card-${e.currentTarget.value}`
        )?.style;
        card.display === "none"
            ? (card.display = "block")
            : (card.display = "none");
    };
    return (
        <>
            {faq.map((item, index) => (
                <div key={index} className="faq">
                    <button
                        className="faq-item"
                        onClick={handleToggle}
                        value={index}
                    >
                        {item.question} <b>+</b>
                    </button>
                    <div
                        id={`faq-answer-card-${index}`}
                        style={{ display: "none" }}
                    >
                        {item.answer}
                    </div>
                </div>
            ))}
        </>
    );
};
