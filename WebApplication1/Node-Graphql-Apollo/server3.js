const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const ProjectsAPI = require('./projects-api.js')


async function startApolloServer() {

	const typeDefs = gql`
	    type Query {
	        project(id: Int!): Project
	        projects: [Project]
	    },
	    type Mutation {
	        updateProject(id: Int!, project: UpdateProject!): Project
	    }
	    type Project {
			id: Int,
			name: String,
			description: String,
			role: String,
			tech: String,
			image: String,
			url: [Url],
			projid: String,
			type: [String]
	    }
	    type Url {
			link: String,
			text: String,
			
	    }
	    input UpdateProject{
	    	id: Int,
			name: String,
			description: String,
			role: String,
			tech: String,
			image: String,
			url: [UpdateUrl],
			projid: String,
			type: [String]
	    }

	    input UpdateUrl {
			link: String,
			text: String
	    }
	`;

	const resolvers = {
	 	Query: {
	 		project: async (_, { id }, { dataSources }) => {
	      		return dataSources.projectsAPI.getProject(id);
	    	},
	    	projects: async (_, {}, { dataSources }) => {
	      		return dataSources.projectsAPI.getAllProjects();
	    	}
	    },
	    Mutation: {
	    	updateProject: async (_, { id, project }, { dataSources }) => {
	    		console.log(id,project);
	      		return dataSources.projectsAPI.updateProject(id,project);
	    	}
	    }
	};


	const server = new ApolloServer({ typeDefs, resolvers,
		dataSources: () => ({
	    	projectsAPI: new ProjectsAPI(),
	  	})
	});

  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer();


