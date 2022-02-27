---
title: ADTs in OOP - FTW or WTF?
date: 2020-01-16
description: What would Algebraic Data Types look like in Object Oriented Programming?
layout: blog_layout
---

A lot of times it might feel like some development communities are far apart. This is totally understandable. We are all doing our best, and we don't have the time or energy to stay up to date with every corner of the development world. In this post I want to bring the typed functional world and the object oriented world a little closer together. To do so, let's take a small snippet adapted from the [ReasonML documentation](https://reasonml.github.io/docs/en/variant#constructor-arguments) and dissect it through porting to TypeScript. You can play with this snippet on the [try reason website](https://reasonml.github.io/en/try?rrjsx=true&reason=C4TwDgpgBAhgxnA9gVwHbCgXgFBSgHygDlFUJcCoBJVAZ2BgHMAnGAWwAp7mBLVRgJQVCAMXgQARokQBrLsF78ANFD7ABAbmzYANhAwsI+voyxQO8JGnVYAfBVoB3HsDgALc5ZToBUAN7CxKTQmPZ4eACQAEQAEjwAhFGBYnCS0nKo7BAqTBC+oVAUkbE8UFFQANQVUJls0FVlKiAoAOTM0OUN3CYA+ogAZj1qFox5ldXlIBAwzLRQiDoAJgB0SXiENPRMrJy1Y6FFUNExEDo6iGXjNVlXUYkUAL5auvpQbCAAggjeGJjUdAwWOwOFFMsAIFEhHoMO8AOLtYz8MyGRGMDjvL5WHzYABStGW5zRcIRwBMAiAA).

```reason
type account =
  | None
  | Instagram(string)
  | Facebook(string, int);

let greeting = (account) =>
  switch (account) {
  | None =>
    	"Hi!"
  | Facebook(name, age) =>
    	"Hi " ++ name ++ ", you're " ++ string_of_int(age) ++ " years old."
  | Instagram(name) =>
    	"Hello " ++ name ++ "!"
  };

let myAccount = Instagram("nate")
let myGreeting = greeting(myAccount)
Js.log(myGreeting)
```

## What is Reason Doing Here

I think there are 2 big ideas required to understand this code: [variants](https://reasonml.github.io/docs/en/variant), and [pattern matching](https://reasonml.github.io/docs/en/pattern-matching).

It is worth mentioning that some communities call variants by another name. You might hear terms like "Algebraic Data Type", "Sum Type", or "Union Type". These are all roughly the same thing as Reason's variant.

## The `account` Variant

```reason
type account =
  | None
  | Instagram(string)
  | Facebook(string, int);
```

This code introduces one new type, `account`, and three ways to construct a value of that type, `None`, `Instagram`, and `Facebook`. The `None` constructor doesn't require an data. The `Instagram` constructor requires a `string`. The `Facebook` constructor requires a `string` and an `int`. Hmmm... new type... constructors... Let's eagerly jump to an object oriented version of this code.

```typescript
class Account {
  name?: string;
  age?: number;
  type: string;

  private constructor(name?: string, age?: number, type: string) {
    this.name = name;
    this.age = age;
    this.type = type;
  }

  static None() {
    return new this(undefined, undefined, "None");
  }

  static Instagram(name: string) {
    return new this(name, undefined, "Instagram");
  }

  static Facebook(name: string, age: number) {
    return new this(name, age, "Facebook");
  }
}
```

- Account type introduced: ✔
- Can construct a `None` account with no data: ✔
- Can construct an `Instagram` account with a name: ✔
- Can construct a `Facebook` account with a name and age: ✔

This is looking fair enough so far. As far as representing the Reason code goes, we're well on our way. Now let's take a look at that `greeting` function.

## Pattern Matching in `greeting`

```reason
let greeting = (account) =>
  switch (account) {
  | None =>
    	"Hi!"
  | Facebook(name, age) =>
    	"Hi " ++ name ++ ", you're " ++ string_of_int(age) ++ " years old."
  | Instagram(name) =>
    	"Hello " ++ name ++ "!"
  };
```

The heart of this code is branching based on the type of the account.

- If it is a `None` account, we simply greet with `"Hi!"`.
- If it is a `Facebook` account, we greet based on the name and age.
- If it is an `Instagram` account, we greet based on the name.

This sounds like a pretty mechanical translation as well. And since Reason co-opted `switch` for pattern matching, we can even just use a regular JavaScript `switch`. However, instead adding a `greeting` function, let's make it a method on `Account`.

```typescript
class Account {
  // ... our Account definition from before ...

  greeting(): string {
    switch (this.type) {
      case "None":
        return "Hi!";
      case "Facebook":
        return `Hi ${this.name}, you're ${this.age} years old.`;
      case "Instagram":
        return `Hello ${this.name}!`;
    }
  }
}
```

So, at this point we are almost finished. Let's wrap this up with `console.log`.

```typescript
// original reason code in comment above each line

// let myAccount = Instagram("nate");
let myAccount = Account.Instagram("Nate");

// let myGreeting = greeting(myAccount);
let myGreeting = myAccount.greeting();

// Js.log(myGreeting);
console.log(myGreeting);
```

## Not Quite

You might be screaming at me right now. I know that typescript is screaming at me right now:

> Function lacks ending return statement and return type does not include 'undefined'.
> \- _The TypeScript Compiler_

Our problem is familiar to anyone who has done typed programming. Our method promises to return a string, but we did not make good on that promise. If `this.type` is something other than `"None"`, `"Instagram"`, or `"Facebook"`, our code will happily return `undefined`. We could return some dummy or throw an exception, but I think we are missing out on some connection between algebraic data types and object oriented programming. Let's take a step back.

## Another Way

Our first red flag should have been that we were branching based on some sort of type information. Object oriented programming languages have a very special tool for branching based off type information. It is called method dispatch. We should not write the branch, it is already built into the language. We just have to model our problem appropriately. If we are going to do method dispatch, we want `greeting` to go to the right place. Instead of writing the branch ourselves, we need three different `greeting` methods for the language to choose from. If we want our `Account` type to look the same from the outside, we will have to create three subclasses. A couple nice things will fall out of this. Let's look.

```typescript
interface Account {
  greeting(): string;
}

class None implements Account {
  greeting(): string {
    return "Hi!";
  }
}

class Instagram implements Account {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  greeting(): string {
    return `Hello ${this.name}!`;
  }
}

class Facebook implements Account {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greeting(): string {
    return `Hi ${this.name}, you're ${this.age} years old.`;
  }
}
```

Let's break down what happened.

We no longer have an `Account` class, instead we have an `Account` interface. This makes a lot of sense. The reason `account` type was really just a label for either the `None`, `Instagram`, and `Facebook` account data structures. If we never pattern matched on the account to pull out the underlying data, it was just a black box. Once we pattern matched, we knew that we were dealing with one of those structures, and we could actually do work.

We also got rid of those `?`s! This is a great sign because `name` and `age` are not truly optional. If the account is a `Facebook` account, they are always required. By making each variant of `account` into its own class, we get to model the data required by each variant on its own. Then we use `implements Account` to tie them all back together.

## ADT -> OOP

So we have a bit of a formula here. It is a simple one, and it will need some more work once you use [more interesting forms of pattern matching](https://reasonml.github.io/docs/en/pattern-matching). However, I think it provides a lot of intuition.

- You can think about each variant/algebraic data type/union as an `interface`.
- Each constructor is a class that implements that interface.
- If a function simply pattern matches on the constructor type, it is a method on the interface.

In this example:

- We turned `type account` into `interface Account`
- We turned `None`, `Instagram`, and `Facebook` into classes that `implement Account`
- We turned `greeting` into a method on the `Account` interface.

## Learning More

These two courses really cemented a lot of this comparative stuff for me. I think they are pretty great, and I highly recommend them.

- [Coursera - UW - Programming Languages](https://www.coursera.org/learn/programming-languages)
- [Coursera - EPFL - Functional Programming Principles in Scala](https://www.coursera.org/learn/progfun1)

## Thanks

Hopefully this article has helped you cross that boundary between statically typed, functional languages and class based, object oriented languages a little smoother.

Thanks for reading!
