import { useEffect, useState } from "react";
import { base_url } from "../utils/constants.js";

const storage_key = 'planets';
const thirty_days = 30 * 24 * 60 * 60 * 1000;

const Contact = () => {

    const [planets, setPlanets] = useState(() => {
        const stored = localStorage.getItem(storage_key);

        if (!stored) return null;

        const { data, timestamp } = JSON.parse(stored);

        if (Date.now() - timestamp < thirty_days) {
            return data;
        }

        return null;
    });

    useEffect(() => {
        if (!planets) {
            fetch(`${base_url}/v1/planets`)
                .then(res => res.json())
                .then(data => {
                    const names = data.map(planet => planet.name);

                    localStorage.setItem(
                        storage_key,
                        JSON.stringify({
                            data: names,
                            timestamp: Date.now()
                        })
                    );

                    setPlanets(names);
                });
        }
    }, [planets]);

    return (
        <div className="container">

            {!planets && (
                <p>
                    <span className="spinner-border spinner-border-sm"></span>
                    <span className="spinner-grow spinner-grow-sm">Loading...</span>
                </p>
            )}

            {!!planets &&
                <form>
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" name="firstname" placeholder="Your name.." />

                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" name="lastname" placeholder="Your last name.." />

                    <label htmlFor="planet">Planet</label>
                    <select id="planet" name="planet">
                        {planets.map(planet => (
                            <option key={planet} value={planet}>{planet}</option>
                        ))}
                    </select>

                    <label htmlFor="subject">Subject</label>
                    <textarea
                        id="subject"
                        name="subject"
                        placeholder="Write something.."
                        style={{ height: '200px' }}
                    ></textarea>

                    <input type="submit" value="Submit" />
                </form>
            }

        </div>
    );
};

export default Contact;