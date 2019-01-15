const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema} = require('graphql');
const axios = require('axios');

const FairingsType = new GraphQLObjectType({
    name: "fairings",
    fields: () => ({
        reused: {type: GraphQLBoolean},
        recovered: {type: GraphQLBoolean},
        recovery_attempt: {type: GraphQLBoolean},
        ship: {type: GraphQLString}
    })
})

const RocketType = new GraphQLObjectType({
    name: "Rocket",
    fields: () => ({
        rocket_id: {type: GraphQLString},
        rocket_name: {type: GraphQLString},
        rocket_type: {type: GraphQLString},
        fairings: {type: FairingsType}
    })
});

const FicklrImagesType = new GraphQLObjectType({
    name: "flickr_images",
})

const LinksType = new GraphQLObjectType({
    name: "Links",
    fields: () => ({
        mission_patch: {type: GraphQLString},
        mission_patch_small: {type: GraphQLString},
        video_link: {type: GraphQLString},
        wikipedia: {type: GraphQLString},
        reddit_launch: {type: GraphQLString},
        presskit: {type: GraphQLString},
        article_link: {type: GraphQLString}
    })
})

const LaunchType = new GraphQLObjectType({
    name: "Launch",
    fields: () => ({
        flight_number: {type: GraphQLInt},
        mission_name: {type: GraphQLString},
        launch_year: {type: GraphQLInt},
        launch_date_local: {type: GraphQLString},
        launch_success: {type: GraphQLBoolean },
        rocket: {type: RocketType},
        details: {type: GraphQLString},
        links: {type: LinksType} ,
        is_tentative: {type: GraphQLBoolean},
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        launches: {
            type: new GraphQLList(LaunchType),
            resolve(parent, args){
                return axios.get('https://api.spacexdata.com/v3/launches').then(res => res.data)
            }
        },
        launch: {
            type: LaunchType,
            args: { flight_number: { type: GraphQLInt }},
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`).then(res => res.data)
            }
        },
        rockets :{
            type: new GraphQLList(RocketType),
            resolve(parents, args){
                return axios.get('https://api.spacexdata.com/v3/rockets').then(res => res.data)
            }
        },
        rocket: {
            type: RocketType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                return axios.get(`https://api.spacexdata.com/v3/rockets/${args.id}`).then(res => res.data)
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})