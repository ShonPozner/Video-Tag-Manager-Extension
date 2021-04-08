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

String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


export const HashPageUrl = PageUrl.hashCode();





export const CreateNewSummaryForm = () => {
  let newSummary = {
    //TODO fix it...
    // id : 1000,
    url : PageUrl,
    hashUrl: HashPageUrl,
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


