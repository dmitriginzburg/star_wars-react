import { base_url, period_month } from "../utils/constants.js";
import { useEffect, useState } from "react";

const Contact = () => {
    const [planets, setPlanets] = useState(() => {
        const planets = JSON.parse(localStorage.getItem('planets'));
        if (planets && ((Date.now() - planets.time) < period_month)) {
            return planets.payload;
        }
        return null;
    });

    useEffect(() => {
        const getPlanets = async () => {
            const res = await fetch(`${base_url}/v1/planets`);
            const data = await res.json();
            const names = data.map(item => item.name);

            setPlanets(names);

            localStorage.setItem('planets', JSON.stringify({
                payload: names,
                time: Date.now()
            }));
        };

        if (!planets) {
            getPlanets();
        }
    }, []);

    return (
        <div className="bg-white/90 p-6 rounded-md w-3/4 mx-auto mt-6">

            {!!planets &&
                <form className="space-y-4" onSubmit={e => e.preventDefault()}>

                    <div>
                        <label className="block text-danger mb-1">First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            className="w-full p-3 border rounded-md text-black"
                            placeholder="Your name.."
                        />
                    </div>

                    <div>
                        <label className="block text-danger mb-1">Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            className="w-full p-3 border rounded-md text-black"
                            placeholder="Your last name.."
                        />
                    </div>

                    <div>
                        <label className="block text-danger mb-1">Planet</label>
                        <select
                            name="planet"
                            className="w-full p-3 border rounded-md text-black"
                        >
                            {planets.map(item =>
                                <option key={item} value={item}>{item}</option>
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block text-danger mb-1">Subject</label>
                        <textarea
                            name="subject"
                            className="w-full p-3 border rounded-md text-black h-48"
                            placeholder="Write something.."
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
                    >
                        Submit
                    </button>

                </form>
            }
        </div>
    );
};

export default Contact;