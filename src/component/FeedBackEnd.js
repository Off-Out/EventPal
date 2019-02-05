import firebase, { auth, database } from '../firebase';

class FeedBackEnd {
  uid = '';
  name = '';
  feedRef = null;

  constructor() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setUid(user.uid);
        database.ref(`/users/${user.uid}`).on('value', snapshot => {
          this.setName(snapshot.val().name);
        });
      }
    });
  }

  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }

  setName(value) {
    this.name = value;
  }

  getName() {
    return this.name;
  }

  // retrieve the feeds from the Backend
  loadFeeds(callback) {
    const today = new Date().toDateString();
    this.feedRef = database.ref(`/feeds`);
    this.feedRef.off();
    const onReceive = data => {
      const feed = data.val();
      callback({
        _id: data.key,
        context: feed.context,
        comments: feed.comments,
        likes: feed.likes,
        createdAt: new Date(feed.createdAt),
        userId: feed.userId,
        userName: feed.userName,
      });
    };
    this.feedRef.limitToLast(50).on('child_added', onReceive);
  }
  // send the feed to the Backend
  postFeed(feed) {
    this.feedRef.push({
      context: feed.context,
      userId: feed.userId,
      userName: feed.userName,
      likes: feed.likes,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
  }

  postComment(key, comment, userId, userName) {
    this.feedRef.child(`${key}/feedComments`).push({
      comments: comment,
      userId: userId,
      userName: userName,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
  }

  likePost(key) {
    this.feedRef
      .child(key)
      .child('likes')
      .transaction(likes => (likes || 0) + 1);
  }
}

export default new FeedBackEnd();
