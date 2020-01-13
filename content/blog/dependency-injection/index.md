---
title: Dependency Injection From First Principles
date: "2020-01-11T11:42:12-06:00"
description: A look from first principles at dependency injection.
---

If you are starting to learn web development, you have probably run into
[dependency injection](https://en.wikipedia.org/wiki/Dependency_injection).

If you are working with Spring it might look like this:

```java
class MyClass {
    @Autowired
    public MyClass(MyDependency myDependency) { ... }
}
```

Angular looks almost identical:

```typescript
@Component(...)
class MyClass {
  constructor(myDependency: MyDependency) {
    ...
  }
}
```

Or maybe you are testing in Python with pytest and it looks like this:

```python
def test_user_can_purchase_a_product(client):
    ...
```

Dependency injection comes in a ton of contexts and varieties. In this post I
want to explore "What Is Dependency Injection?", "Why Do We Do It?", and
"How Do We Do It?".

## What Is Dependency Injection?

At its heart, dependency injection is about moving code out of a particular
function/class and into an argument to that function/class.

```python
def login(username, password):
    if check_credentials(username, password):
        ...
    else:
        ...
```

It is pretty plain to see that `check_credentials` is used by `login`.
In other words, `login` **depends on** `check_credentials`.
`login` has other dependencies though.
It also depends on `username` and `password`.
However, there is an important distinction between `check_credentials`
and `username`/`password`.

The `username` and `password` dependencies are provided as an argument.
If I want to change `username` or `password`, I call it with different
arguments.

The `check_credentials` dependency is hard-coded inside `login`.
If I want to change `check_credentials`, I rewrite `login`. This
might be totally fine. You might never want to change it. But if
you do, the most natural place would be to accept it as an argument.

```python
def login(username, password, check_credentials):
    if check_credentials(username, password):
        ...
    else:
        ...
```

Now, whenever `login` gets called, you just provide the appropriate
function for `check_credentials`. `login` still depends on `check_credentials`,
but it is no longer a hard-coded dependency. Unfortunately, we've now made every
call site a little more annoying. Now, every time we call `login` we have to
provide an appropriate `check_credentials`. We'll talk about making it less
annoying in a second, but first let's talk about why we do this at all.

## Why Do We Do It?

From my exposure, we do it for two reasons: testing, and we have to. I'm
certain my perspective is limited, but I'll limit myself to discussing
these two reasons.

### Testing

If you are using some mocking tool to replace a class or function
while testing, you are changing that dependency. If that dependency
were provided as an argument, you would not need the mocking tool.

```python
from unittest.mock import patch

def test_login_success():
    # changing the dependency through a mocking tool
    with patch('check_credentials', return_value=True):
        login('admin', 'password123')
        ...

def test_login_success():
    def always_pass(username, password):
        return True

    # changing the dependency by providing a different argument
    login('admin', 'password123', always_pass)
    ...
```

I'm not here to argue for or against mocking, but it is valuable
to realize that both examples are mocking. Even though the second example
doesn't use any fancy tools to mess with `login` before it runs, it is
still providing a
[mock implementation](https://en.wikipedia.org/wiki/Mock_object).
The example where we provide `always_pass` as an argument just requires
less heavy lifting.

### We Have To

I think the other most common reason is that your tool of choice makes
you. It is hard for me to think of a modern web development framework
that doesn't contain some sort of dependency injection solution. Instead
of trying to highlight a bunch of examples, I want to give you an idea of
what to look for in your framework of choice.

## How Do We Do It?

Let's go back to the code that we don't want to write.

```python
def some_function(...):
    login(username, password, real_check_credentials)
```

We don't want to write `real_check_credentials` all over the place in
our application. The good news is that you usually don't have to.
Most contexts where you hear people use the term "dependency injection"
are working inside a dependency injection container. A dependency injection
container is the central piece of machinery that allows for a more pleasant
experience with this style of programming. If you see some of the following
things, you might be inside a dependency injection container:

- A way of registering dependencies:
  - `@Injectable` (Angular)
  - `@pytest.fixture` (pytest)
  - `services.AddScoped` (ASP.NET)
- A way of hooking into a dependency context or requesting dependencies:
  - `@AutoWire` (Spring)
  - `@Component` (Angular)
  - arguments you don't provide (pretty much all of them)
- The framework calls the function or constructs the object for you

Looking at those three clues, we can get a good idea of what must be going
on behind the scenes. There must be some registry of dependencies being
maintained and provided on demand. The third bullet outlines the trick to
making it all work. If you were to construct the object or call the function
yourself, you would have to provide the argument. However, if the framework
is doing the work it can provide the required dependencies at the appropriate
time. This is the dependency injection container at work. You register
dependencies, request dependencies, and provide some sort of class or function
to be called where that registry is available.

## Thanks

Hopefully this provides a helpful look at the basics of dependency injection.
Dependency injection is all over the place, and I remember being disoriented
when I first worked with it.

Thanks for reading!
