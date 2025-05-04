# Software sauna coding challenge

Made a solution according to `task.md` with OO principles, using Typescript with node.js and Jest for testing

## How to run

A standard node.js runtime is required. Make sure node and npm are installed (I used node v22, but should work on lower)

To set up, run:

```shell
npm install
```

To play around with this, it is mostly recommended to write tests, as e2e tests are written in `e2e` folder

To run tests:

```shell
npm run test
```

However, if one wants to play around without writing tests, `run.ts` is premade and `input` variable can be edited to test with different input.

To run this script:

```shell
npm run dev
```

## Personal notes

I hope I have taken a good OO approach to this problem. Companies may have a different opinions on OO, but I think it is a good approach for this specific problem

I tried to demonstrate most concepts as they would be in production and delivery quality and maintainable code. However, some shortcuts have been taken, and I left various comments in specific place - mostly in places where point is already proven, and additional details would take a lot of time.

**Please find my comments and readme files for additional reasoning behind some concepts**

Also note, a production code could get more complicated, with more layers of abstractions, depending on the complexity and need. However, I feel that adding more abstraction to this would be overengineering and make code harder to follow

### Points to improve

That being said, there are more things I could have done for this task. It could have no end, so I will just write some of them:

- An interactive way to input the map (I could serve small webserver with a simple textarea input)
- **Linting** - I was very sad I did not add lint at the start, especially since I started this before vacation and ended it once I returned. So I have many styling inconsistencies, especially with semicolon usage.
- Dockerfile - for reviewers without node runtime

And surely many other points.

Even so, I hope you will find a solution well-made, maintainable and tested.
