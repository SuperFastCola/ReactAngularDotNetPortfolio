const { RESTDataSource } = require('apollo-datasource-rest');

module.exports = class ProjectsAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();

    // Sets the base URL for the REST API
    this.baseURL = 'http://graphql.local/api/';
  }

  async getProject(id) {
    // Send a GET request to the specified endpoint
    console.log(id);
    return this.get(`values/${id}`);
  }

  async getAllProjects() {
    const data = await this.get('values');
    return data.projects;
  }

  async updateProject(id,project) {
    const data = await this.put(`values/${id}`,project);
    console.log(data);
    return data;
  }
}




