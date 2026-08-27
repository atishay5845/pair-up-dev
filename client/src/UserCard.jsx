import React from 'react'

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, about, skills } = user;
    console.log(user)
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="photo" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && (
                    <p>{age + " " + gender}</p>
                )}
                {about && (
                    <p>{about}</p>
                )}
                {skills && skills.length > 0 && (
                    <div>
                        <p>Skills:</p>
                        <ul className="flex flex-wrap gap-2 mt-2">
                            {skills.map((skill, index) => (
                                <li key={index} className="badge badge-outline">{skill}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Interested</button>
                    <button className="btn btn-primary">Skip</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard