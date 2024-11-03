//import the types
import { Park, Campground } from './types'; // Import types
import { parksContainer, campgroundsContainer, galleryContainer } from './main';



// Display parks in the UI
export function displayParks(parks: Park[]) {
    parksContainer.innerHTML = ''; // Clear previous results
    if (parks.length === 0) {
        parksContainer.innerHTML = '<p>No parks found for this state.</p>';
        return;
    }

    //create html for the parks
    parks.forEach(park => {
        const parkDiv = document.createElement('div');
        parkDiv.className = 'park-item mb-3 border border-success p-3';
        parkDiv.innerHTML = `
            <h4>${park.fullName}</h4>
            <p>${park.description}</p>
            <button class="btn btn-danger" data-park-id="${park.id}">Delete</button>
        `;

        //add button click event listener
        const button = parkDiv.querySelector('button[data-park-id]') as HTMLButtonElement;
        button.addEventListener('click', () => deletePark(park.id));

        parksContainer.appendChild(parkDiv);

        // Add park image to gallery if available
        if (park.images.length > 0) {
            const img = document.createElement('img');
            img.src = park.images[0].url;
            img.alt = park.images[0].altText;
            img.className = 'img-fluid';
            galleryContainer.appendChild(img);
        }
    });
}



// Display campgrounds
export function displayCampgrounds(campgrounds: Campground[]) {
    campgroundsContainer.innerHTML = ''; // Clear previous results
    if (campgrounds.length === 0) {
        campgroundsContainer.innerHTML = '<p>No campgrounds found for this state.</p>';
        return;
    }

    //create the html for the campgrounds
    campgrounds.forEach(campground => {
        const campgroundDiv = document.createElement('div');
        campgroundDiv.className = 'campground-item mb-3 border border-success p-3';
        campgroundDiv.innerHTML = `
            <h4>${campground.name}</h4>
            <p>${campground.description}</p>
            <button class="btn btn-danger" data-campground-id="${campground.id}">Delete</button>

        `;

        // Add the button click event listener
        const button = campgroundDiv.querySelector('button[data-campground-id]') as HTMLButtonElement;
        button.addEventListener('click', () => deleteCampground(campground.id));

        campgroundsContainer.appendChild(campgroundDiv);
    });
}


//Delete Button Functions
//added : string and as HTMLButtonElement and added event liseners to display functions
//also added data attributes for the buttons
export function deletePark(parkId: string) {
    const parkItems = document.querySelectorAll('.park-item');
    parkItems.forEach(item => {
        const button = item.querySelector('button[data-park-id]') as HTMLButtonElement;
        if (button && button.dataset.parkId === parkId) {
            item.remove();
        }
    });
}

export function deleteCampground(campgroundId: string) {
    const campgroundItems = document.querySelectorAll('.campground-item');
    campgroundItems.forEach(item => {
        const button = item.querySelector('button[data-campground-id]') as HTMLButtonElement;
        if (button && button.dataset.campgroundId === campgroundId) {
            item.remove();
        }
    });
}