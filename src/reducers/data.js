function data(state, action) {
    switch (action.type) {
        case 'SEARCH_VIDEO': {
            // action.payload.query
            let results = []
            if(action.payload.query) {
                const categories = state.data.categories;
                categories.map(category => {
                    let tempResults = category.playlist.filter(item => {
                        const itemAuthor = item.author.toLowerCase();
                        const payloadQuery = action.payload.query.toLowerCase();
        
                        return itemAuthor.includes(payloadQuery);
                    })
                    results = results.concat(tempResults);
                })
            }

            return {
                ...state,
                search: results
            }
        }
        default:
            return state 
    }
}

export default data;