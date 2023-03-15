import { Comment } from "../data/comment.mjs";
import { GameData } from "../data/game.mjs";
import { User } from "../data/User.mjs";

export async function getCommentsForGame(name) {
  const comments = await Promise.all(
    (
      await Comment.find()
    ).map(async (comment) => {
      const { text, raiting, date } = comment;
      const user = await User.findById(comment.user);
      const { userName } = user || { userName: "" };
      const game = await GameData.findById(comment.game);
      const { name: gameName } = game || { name: "" };

      return { userName, gameName, text, raiting, date };
    })
  );

  return comments.filter(
    (comment) => (name ? name === comment.gameName : true) && comment.userName
  );
}

export async function getGameRaiting(name) {
  const comments = await getCommentsForGame(name);
  if (comments.length === 0) return 0;

  return (
    comments.reduce((sum, comment) => sum + comment.raiting, 0) /
    comments.length
  );
}
