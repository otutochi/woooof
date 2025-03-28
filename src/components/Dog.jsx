import React from "react"


const Dog = ({ breed, group, country, lifespan, image, banBreed, banGroup, banCountry, banLifespan }) => {
    return (
        <div className="Dog" >
            <div>
                <button onClick={() => banBreed(breed)} >Breed: <strong>{breed}</strong></button>
                <button onClick={() => banGroup(group)} >Group: <strong>{group}</strong></button>
                <button onClick={() => banCountry(country)} >Country: <strong>{country}</strong></button>
                <button onClick={() => banLifespan(lifespan)} >Lifespan: <strong>{lifespan}</strong></button>
            </div>
            <div>
                <img src={image} />
            </div>
        </div>
    )
}

export default Dog