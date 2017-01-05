import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";

var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/puppies';
var db = pgp(connectionString);



/**
 * / route
 *
 * @class User
 */
export class DataBaseRoute {

  public static create(router: Router) {
      //log
      console.log("[IndexRoute::create] Creating index route.");

      router.get("/api/puppies", (req: Request, res: Response, next: NextFunction) => {
          new DataBaseRoute().getAllPuppies(req, res, next);
      });

      router.get("/api/puppies/:id", (req: Request, res: Response, next: NextFunction) => {
          new DataBaseRoute().getSinglePuppy(req, res, next);
      });

      router.post("/api/puppies", (req: Request, res: Response, next: NextFunction) => {
          new DataBaseRoute().createPuppy(req, res, next);
      });
  }

  public getAllPuppies(req: Request, res: Response, next: NextFunction) {
    db.any('select * from pups')
        .then(function (data) {
          res.status(200)
              .json({
                status: 'success',
                data: data,
                message: 'Retrieved ALL puppies'
              });
        })
        .catch(function (err) {
          return next(err);
        });
  }

  public getSinglePuppy(req: Request, res: Response, next: NextFunction) {
    var pupID = parseInt(req.params.id);
    db.one('select * from pups where id = $1', pupID)
        .then(function (data) {
          res.status(200)
              .json({
                status: 'success',
                data: data,
                message: 'Retrieved ONE puppy'
              });
        })
        .catch(function (err) {
          return next(err);
        });
  }

    public createPuppy(req: Request, res: Response, next: NextFunction) {
        req.body.age = parseInt(req.body.age);
        db.none('insert into pups(name, breed, age, sex)' +
            'values(${name}, ${breed}, ${age}, ${sex})',
            req.body)
            .then(function () {
                res.status(200)
                    .json({
                        status: 'success',
                        message: 'Inserted one puppy'
                    });
            })
            .catch(function (err) {
                return next(err);
            });
    }
}
