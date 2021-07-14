const axios = require('axios');
const moment = require('moment');

export const fetchData = async () => {
    const url = 'https://forum-proxy.freecodecamp.rocks/latest';
    try {
        const res = await axios.get(url);
        const { topics } = await res.data.topic_list;
        const { users } = await res.data;
        return topics.map(itm => {
            return {
                title: itm.title,
                id: itm.id,
                replies: itm.reply_count,
                posters: itm.posters.map(poster => users.find(user => user.id === poster.user_id)),
                status: itm.closed,
                active: moment(new Date(itm.bumped_at), 'YYYYMMDD').fromNow(),
                views: itm.views,
                topic_link: itm.slug
            }
        });

    } catch (err) {
        console.error(err);
    }
};
