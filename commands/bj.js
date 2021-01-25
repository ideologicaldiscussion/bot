module.exports = async (args, msg, Discord) => {
	const images = [
		'https://ksassets.timeincuk.net/wp/uploads/sites/46/2016/08/Boris-Johnson-hair-history-920x690.jpg',
		'https://cdn.images.express.co.uk/img/dynamic/1/590x/secondary/ctp-video-brexit-news-boris-johnson-boris-johnson-news-boris-johnson-latest-general-election-results-conservative-majority-2215500.jpg',
		'https://g8fip1kplyr33r3krz5b97d1-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/GettyImages-1188142747-714x476.jpg',
		'https://www.ft.com/__origami/service/image/v2/images/raw/http://blogs.ft.com/westminster/files/2019/12/shutterstock_editorial_General_Election_2019_London_U_10504750AC.png',
		'https://media12.s-nbcnews.com/j/MSNBC/Components/Video/201912/tdy_news_keir_boris_191213_1920x1080.760;428;7;70;5.jpg',
		'https://ichef.bbci.co.uk/images/ic/720x405/p07vxr8b.jpg',
		'https://www.newstatesman.com/sites/default/files/styles/cropped_article_image/public/blogs_2019/10/gettyimages-1178816046.jpg',
		'https://static.standard.co.uk/s3fs-public/thumbnails/image/2019/12/07/13/borisjohnson071219a.jpg',
		'https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/11/08/08/boris-johnson-elgin.jpg',
		'https://i2-prod.dailyrecord.co.uk/incoming/article18792405.ece/ALTERNATES/s615/0_European-Best-Pictures-Of-The-Day-July-27-2019-Boris-Johnson-Announces-His-Domestic-Priorities.jpg',
		'https://e3.365dm.com/20/06/640x380/skynews-boris-johnson-bovingdon-primary-academy_5017676.jpg',
	];

	const image = images[Math.floor(Math.random()*images.length)];

    msg.channel.send(`Mmmmmmmmm like this ${msg.member}?`, {
		files: [image],
	});
};
