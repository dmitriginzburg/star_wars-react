import {useEffect, useState} from "react";
import {base_url} from "../utils/constants.js";

const STORAGE_KEY = 'planets';
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

const Contact = () => {
    const [planets, setPlanets] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (stored) {
            const {data, timestamp} = JSON.parse(stored);
            if (Date.now() - timestamp < THIRTY_DAYS) {
                setTimeout(() => setPlanets(data), 0);
                return;
            }
        }

        fetch(`${base_url}/v1/planets`)
            .then(response => response.json())
            .then(data => {
                const names = data.map(planet => planet.name);
                localStorage.setItem(STORAGE_KEY, JSON.stringify({data: names, timestamp: Date.now()}));
                setPlanets(names);
            })
    }, []);

    return (
        <div className="container">
            <form>
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>

                <label htmlFor="planet">Planet</label>
                <select id="planet" name="planet">
                    {planets.map(planet => (
                        <option key={planet} value={planet}>{planet}</option>
                    ))}
                </select>

                <label htmlFor="subject">Subject</label>
                <textarea id="subject" name="subject" placeholder="Write something.." style={{height: '200px'}}></textarea>

                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
}

export default Contact;