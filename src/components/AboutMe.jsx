import { base_url } from "../utils/constants.js";
import { useEffect, useState } from "react";

const storage_key = 'luke_skywalker';
const thirty_days = 30 * 24 * 60 * 60 * 1000;

const AboutMe = () => {

    const [hero, setHero] = useState(() => {
        const stored = localStorage.getItem(storage_key);

        if (!stored) return null;

        const { data, timestamp } = JSON.parse(stored);

        if (Date.now() - timestamp < thirty_days) {
            return data;
        }

        return null;
    });

    useEffect(() => {
        if (!hero) {
            fetch(`${base_url}/v1/peoples/1`)
                .then(response => response.json())
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

                    localStorage.setItem(
                        storage_key,
                        JSON.stringify({
                            data: info,
                            timestamp: Date.now()
                        })
                    );

                    setHero(info);
                });
        }
    }, [hero]);

    return (
        <>
            {!hero && (
                <p>
                    <span className="spinner-border spinner-border-sm"></span>
                    <span className="spinner-grow spinner-grow-sm">Loading...</span>
                </p>
            )}

            {!!hero &&
                <div className='fs-2 lh-lg text-justify ms-5'>
                    <p><span className='display-3'>name:</span> {hero.name}</p>
                    <p><span className='display-3'>gender:</span> {hero.gender}</p>
                    <p><span className='display-3'>birth year:</span> {hero.birth_year}</p>
                    <p><span className='display-3'>height:</span> {hero.height}</p>
                    <p><span className='display-3'>mass:</span> {hero.mass}</p>
                    <p><span className='display-3'>hair color:</span> {hero.hair_color}</p>
                    <p><span className='display-3'>skin color:</span> {hero.skin_color}</p>
                    <p><span className='display-3'>eye color:</span> {hero.eye_color}</p>
                </div>
            }
        </>
    );
};

export default AboutMe;