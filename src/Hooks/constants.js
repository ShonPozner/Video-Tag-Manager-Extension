export const Direction = {
    Top: 'top',
    TopLeft: 'topLeft',
    TopRight: 'topRight',
    Right: 'right',
    Bottom: 'bottom',
    BottomLeft: 'bottomLeft',
    BottomRight: 'bottomRight',
    Left: 'left',
  };


// TODO change to real backend server
export const Url = 'http://localhost:5000/';

export const PageUrl = window.location.href;



export const CreateNewSummaryForm = () => {
  let newSummary = {
    //TODO fix it...
    id : 1000,
    url : PageUrl,
    title : "Title...",
    autorName : "Shon4me",
    createdTime : new Date(),
    editTime : new Date(),
    tags: ["tag1", "tag2"],
  };
  return newSummary
}

export const GetRandomId = () => {
  return Math.floor(Math.random() * 10000000) + 1;
}


