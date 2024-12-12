export const POSTS = [
	{
		_id: "1",
		text: "I want to find an apartment near compus",
		img: "chestnut_puke.jpg",
		user: {
			username: "sherman",
			profileImg: "chestnut_puke.jpg",
		},
		comments: [
			{
				_id: "1",
				text: "Nice Tutorial",
				user: {
					username: "janedoe",
					profileImg: "/avatars/girl1.png",
				},
			},
		],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894"],
	},
	{
		_id: "2",
		text: "How are you guys doing? 😊",
		user: {
			username: "sherman",
			profileImg: "chestnut_puke.jpg",
		},
		comments: [
			{
				_id: "1",
				text: "Nice Tutorial",
				user: {
					username: "janedoe",
					profileImg: "/avatars/girl2.png",
				},
			},
		],
		likes: ["6658s891", "6658s892", "6658s893", "6658s894"],
	},
];

export const USERS_FOR_RIGHT_PANEL = [
	{
		_id: "1",
		username: "sherman",
		profileImg: "avatar-placeholder.png",
	},
	{
		_id: "2",
		username: "janedoe",
		profileImg: "avatar-placeholder.png",
	}
]; 