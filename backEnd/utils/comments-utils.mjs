import { Comment } from "../data/comment.mjs";
import { GameData } from "../data/game.mjs";
import { User } from "../data/User.mjs";

export async function getCommentsForGame(name) {
  const comments = await Promise.all(
    (
      await Comment.find()
    ).map(async (comment) => {
      const { text, raiting, date } = comment;
      const { userName } = await User.findById(comment.user);
      const { name: gameName } = await GameData.findById(comment.game);

      return { userName, gameName, text, raiting, date };
    })
  );

  return comments.filter((comment) =>
    name ? name === comment.gameName : true
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
