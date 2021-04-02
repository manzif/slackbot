import app from "./../app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
chai.should();
chai.expect();


describe("testing-server-routes", () => {
  
  it("should ...", (done) => {
    chai
      .request(app)
      .get("/slack")
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.message.should.equal(
          "Users information retrieved successfully"
        );
        done();
      });
  });
});
