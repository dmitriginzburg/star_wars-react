import { base_url, period_month } from "../utils/constants.js";
import { useEffect, useState } from "react";

const AboutMe = () => {

    const [hero, setHero] = useState(() => {
        const hero = JSON.parse(localStorage.getItem("hero"));
        if (hero && ((Date.now() - hero.timestamp) < period_month)) {
            return hero.payload;
        }
        return null;
    });

    useEffect(() => {
        if (!hero) {
            fetch(`${base_url}/v1/peoples/1`)
                .then(res => res.json())
                .then(data => {
                    const info = {
                        name: data.name,
                        gender: data.gender,
                        birth_year: data.birth_year,
                        height: data.height,
                        mass: data.mass,
                        hair_color: data.hair_color,
                        skin_color: data.skin_color,
                        eye_color: data.eye_color
                    };

                    setHero(info);

                    localStorage.setItem("hero", JSON.stringify({
                        payload: info,
                        timestamp: Date.now()
                    }));
                });
        }
    }, []);

    const fields = [
        { label: "name", key: "name" },
        { label: "gender", key: "gender" },
        { label: "birth year", key: "birth_year" },
        { label: "height", key: "height" },
        { label: "mass", key: "mass" },
        { label: "hair color", key: "hair_color" },
        { label: "skin color", key: "skin_color" },
        { label: "eye color", key: "eye_color" }
    ];

    return (
        <>
            {!!hero &&
                <div className="ml-8 mt-6 space-y-4">
                    {fields.map(({ label, key }) => (
                        <p key={key} className="text-5xl">
                            {label}: {hero[key]}
                        </p>
                    ))}
                </div>
            }
        </>
    );
};

export default AboutMe;