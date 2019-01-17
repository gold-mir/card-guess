export async function getRandomCardData(){
  let json = await(await fetch(`https://api.scryfall.com/cards/random`)).json();
  return json;
}
