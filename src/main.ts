//import api key
import { api_key } from "./api_key";
//import the display
import { displayParks, displayCampgrounds } from "./display-and-delete";
//import the types
import { Park, Campground } from './types';


export const form = document.getElementById("stateForm") as HTMLFormElement;
export const parksContainer = document.getElementById("parks") as HTMLDivElement;
export const campgroundsContainer = document.getElementById("campgrounds") as HTMLDivElement;
export const galleryContainer = document.getElementById("gallery") as HTMLDivElement;



//adding type assertion, telling Typescript the element is an HTMLInputElement
const stateInput = document.getElementById("statename") as HTMLInputElement;


//Event listener for form submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  //ensure state code is uppercase
  const state = stateInput.value.trim().toUpperCase();
  await fetchNationalParks(state);
});


//fetch national parks based on the state code
async function fetchNationalParks(state: string) {
  try {
    //Clear previous gallery images before fetching new data
    galleryContainer.innerHTML = '';
    const response = await fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=${api_key}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data: { data: Park[] } = await response.json();
    //display the parks
    displayParks(data.data);
    //fetch campgrounds after parks
    await fetchCampgrounds(state);
  } catch (error) {
    console.error("Error fetching parks:", error);
    parksContainer.innerHTML = '<p class="text-danger">Failed to fetch parks. Please try again later.</p>';
  }
}


// Fetch Campgrounds based on state code
async function fetchCampgrounds(state: string) {
  try {
    const response = await fetch(`https://developer.nps.gov/api/v1/campgrounds?stateCode=${state}&api_key=${api_key}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: { data: Campground[] } = await response.json();
    displayCampgrounds(data.data);
  } catch (error) {
    console.error('Error fetching campgrounds:', error);
    campgroundsContainer.innerHTML = '<p class="text-danger">Failed to fetch campgrounds. Please try again later.</p>';
  }
}


/*


Where displayParks was



*/


/*


Where displayCampground was



*/


/*


Where the deleteButton functions were


*/