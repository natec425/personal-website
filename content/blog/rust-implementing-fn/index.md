---
title: Vanity Rust - Implementing Fn on Rust Structs
date: "2020-02-09T15:11:08-06:00"
description: Learn how to use nightly rust features to treat your structs like functions.
---

The other night I was doing a [coding challenge on codewars](https://www.codewars.com/kata/calculating-with-functions/python). It didn't really have anything to do with algorithms. Instead it focused on your ability to construct a specific API. On codewars, the challenge is only available in Python, JavaScript, and Ruby, but I thought it would be fun to try to solve it with Rust. It turns out that I needed to use some nightly Rust features, so I thought I'd share. The challenge can be summed up in the following line:

```rust
assert_eq!(seven(times(five())), 35);
```

Just from a type signature level, we can determine a few things:

- We need some "number" functions (`seven` and `five`) and some "operator" functions (`times`).
- The "number" functions need to be able to be called with 0 arguments or 1 argument.
- The "operator" functions will always be called with 1 argument

In this post, I want to focus on how you would go about implementing the number functions.

Depending on your language of choice you probably end up googling one of two topics: function overloading, or default arguments. If you were to do so, you would quickly find several kind posts about how Rust doesn't support either of these. People will suggest accepting an `Option` argument or simply creating multiple functions. These are both great suggestions for real software, but this is about code golfing. So instead... we're going nightly.

## Nightly Rust

```bash
$ rustup override set nightly
```

But we're not just doing it for fun, we're doing it because we need two specific nightly features: `unboxed_closures` ([docs](https://doc.rust-lang.org/unstable-book/language-features/unboxed-closures.html)), and `fn_traits` ([docs](https://doc.rust-lang.org/unstable-book/library-features/fn-traits.html)).

### Unboxed Closures

`unboxed_closures` gives us the ability to reach into a lower level of function calling logic. This will feel somewhat similar to defining a [variadic function](https://en.wikipedia.org/wiki/Variadic_function) (e.g. using `arguments` or rest parameters in JavaScript). Let's write a simple add function in Rust normally, and then using `unboxed_closures`.

```rust
// normal
fn add(x: isize, y: isize) -> isize {
    x + y
}
```

```rust
#![feature(unboxed_closures)]
// with unboxed_closures
extern "rust-call" fn add(args: (isize, isize)) -> isize {
    args.0 + args.1
}
```

However, there is a catch. The `unboxed_closures` version of `add` technically has a single argument that is a tuple. This is important to us, because we have to use `unboxed_closures` to implement a `Fn` trait for our struct.

### Implementing Fn

Let's go ahead and dump out a struct to box up our number. In just a minute we'll write the required code to treat our structs like functions.

```rust
struct Number {
    number: isize
}

const five: Number = Number { number: 5 };
const seven: Number = Number { number: 7 };
```

Okay, so we have these structs that box up an integer. Now we need to let `Number`s act like functions. Additionally, we need it to act like a different function depending on the arguments (function overloading). We'll do this by implementing the [`FnOnce` trait](https://doc.rust-lang.org/std/ops/trait.FnOnce.html) for `Number`. `FnOnce` requires that we provide an `Output` type and a `call_once` method that is an `unboxed_closure`. Considering we need it to be overloaded, we will provide an implementation for each argument configuration. **Note:** In my second implementation, I use an argument type of
`Operation`. I'm not defining `Operation` here, but it is part of how solved the original coding challenge.

```rust
#![feature(fn_traits, unboxed_closures)]

// When called with 0 arguments
impl FnOnce<()> for Number {
    type Output = isize;
    extern "rust-call" fn call_once(self, args: ()) -> Self::Output {
        self.number
    }
}

// When called with one argument of type `Operator`.
impl FnOnce<(Operation,)> for Number {
    type Output = isize;
    extern "rust-call" fn call_once(self, args: (Operation,)) -> Self::Output {
        // Do something with self and the Operation
    }
}
```

## Recap

```rust
assert_eq!(seven(times(five())), 35);
                 ^^^^^ Not found in this scope
```

Congrats! We can now create a struct and treat it like a function with overloading. Way simpler than doing it in JavaScript/Python/Ruby! Of course I'm joking, but I still think Rust is super interesting. More dynamic languages will always win at code golf, but Rust is crazy fast, crazy safe, and is a very positive movement in programming languages.
