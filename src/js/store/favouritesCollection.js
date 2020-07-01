class FavoritesList {
  constructor() {
    this.favs = [];
    this.uniqFavs = null;
  }

  getFavourites(addedTicket) {
    this.favs.push(addedTicket);
    return (this.uniqFavs = [...new Set(this.favs)]);
  }

  removeFavourites(removeId) {
    return (this.favs = this.favs.filter((fav) => fav.ticketId !== removeId));
  }
}

const favouritesList = new FavoritesList();

export default favouritesList;
