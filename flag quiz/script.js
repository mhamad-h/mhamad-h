async function initflagObjects(){
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,population
        const countries = await response.json();
    
        // Create an empty object to store the country names and flags
        const countryFlags = {};
    
        // Extract the country names and flag URLs from the data
        countries.forEach(country => {
          countryFlags[country.name] = country.flags.png;
        });
        console.log(countryFlags)
    
        return countryFlags;
      } catch (error) {
        console.error('Error fetching country data:', error);
        return null;
      }
    }
    async function getRandomKeyValue() {
      const countries=await initflagObjects()
      const countrynames=Object.keys(countries)
      const randomIndex = Math.floor(Math.random() * countrynames.length);
      const randomCountryName = countrynames[randomIndex];
      const value = countries[randomCountryName];
      
      const result = { [randomCountryName]: value };
      return result
    }
async function generateRandomCountries(){
  let countries=[]
  
  
  while(countries.length!=3){
    let countryname=Object.keys(await getRandomKeyValue())[0]
    if (countries.includes((countryname)) ===false){
      countries.push(countryname)
  }
    else{continue}
}

return countries;
}

let correctbuttonindex;
async function generateQuizPart(){
    let rightcountry=await getRandomKeyValue()
    let flag =document.createElement('img')
    let choicecontainer=document.createElement('div')
    flag.classList.add('flag')
    choicecontainer.classList.add('choices')
    flag.src=Object.values(rightcountry)[0]
    let choices=[]
    for(let i=0;i<=3;i++){let button= document.createElement('button');button.classList.add('choice');choices.push(button)}
    let countrynames=await generateRandomCountries()
    
    let rightbuttonindex=Math.floor(Math.random()*choices.length)
    choices[rightbuttonindex].innerHTML=Object.keys(rightcountry)[0]
    let passedindex=[]
    let i=0
    while (passedindex.length!=3){
      
      let randomIndex=Math.floor(Math.random()*countrynames.length)
      if (i !=rightbuttonindex && passedindex.includes(randomIndex)===false){
      choices[i].innerHTML=countrynames[randomIndex]
      passedindex.push(randomIndex)
      i+=1
      }else if(i===rightbuttonindex){i+=1}}
  
    let container=document.getElementById('quiz')
    choices.forEach(choice=>{choicecontainer.appendChild(choice)})
    container.innerHTML=''
    container.appendChild(flag)
    container.appendChild(choicecontainer)
    correctbuttonindex=rightbuttonindex    
    return choices   
    
    
    }

let score=0
let isAnswerSelected=false

function addEventListeners() {
  const buttons = document.getElementsByClassName('choice');
  if (isAnswerSelected) {
    // Remove all event listeners if an answer is already selected
    Array.from(buttons).forEach(button => {
      button.removeEventListener('click', correctanswer);
      button.removeEventListener('click', wronganswer);
    });
  } else {
    // Add event listeners for both correct and wrong answers
    Array.from(buttons).forEach((button, index) => {
      if (index === correctbuttonindex) {
        button.addEventListener('click', correctanswer);
      } else {
        button.addEventListener('click', wronganswer);
      }
    });
  }
}
async function wronganswer(event){
  event.target.style.backgroundColor='red'
  isAnswerSelected=true;
  addEventListeners()
  event.target.innerHTML='Wrong Answer!'
  event.target.removeEventListener('click',wronganswer)
  let currentbuttons=[...document.getElementsByClassName('choice')]
  currentbuttons.forEach(button=>{if (button===event.target){}else if(currentbuttons.indexOf(button)===correctbuttonindex){button.removeEventListener('click',correctanswer)}else{button.removeEventListener('click',wronganswer)}})
  let buttons=await generateQuizPart()
  score=0;
  document.getElementById('score').innerHTML=score
  buttons.forEach(button=>{if (buttons.indexOf(button)===correctbuttonindex){button.addEventListener('click',correctanswer)}else{button.addEventListener('click',wronganswer)}})
}

let button=document.getElementById('choice1')
async function correctanswer(event) {
  event.target.style.backgroundColor = 'green';
  event.target.innerHTML = 'Correct!';
  score += 1;
   isAnswerSelected=true;
   addEventListeners()
  // Remove the event listener from the current correct button
  event.target.removeEventListener('click', correctanswer);
  let currentbuttons=[...document.getElementsByClassName('choice')]
  currentbuttons.forEach(button=>{if (button===event.target){}else{button.removeEventListener('click',wronganswer)}})
  // Generate a new quiz part and get the new correct button
  const buttons = await generateQuizPart();
  
  buttons.forEach(button=>{if (buttons.indexOf(button)===correctbuttonindex){button.addEventListener('click',correctanswer)}else{button.addEventListener('click',wronganswer)}})

  
  document.getElementById('score').innerHTML = score;
}
let darkmodestatus=false
function darkmode(){
  if (!darkmodestatus){
  document.body.style.backgroundColor='black'
  document.querySelectorAll('.choice').forEach(button=>{button.style.backgroundColor='white';button.style.color='black'})
  document.querySelector('.scorediv').style.color='white'
  document.getElementById('darkmode').innerHTML='Light Mode'
  darkmodestatus=true
}
  else{document.body.style.backgroundColor='white';document.querySelectorAll('.choice').forEach(button=>{button.style.backgroundColor='black';button.style.color='white' });document.getElementById('darkmode').innerHTML='Dark Mode';darkmodestatus=false}
}
document.getElementById('darkmode').onclick=darkmode
document.getElementById('choice2').addEventListener('click',wronganswer)
document.getElementById('choice3').addEventListener('click',wronganswer)
document.getElementById('choice4').addEventListener('click',wronganswer)
button.addEventListener('click',correctanswer)
document.getElementById('score').innerHTML=score
