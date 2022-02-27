---
title: Inspecting function annotations in Python
date: 2020-02-02
description: Learn how to inspect function annotations in Python and build some neat tricks.
layout: blog_layout
---

For this article, I'm just going to spend some time in the python shell. Please let me know if this is helpful or terrible 😄.

```python
>>> import inspect
>>> # Let's learn a little about the inspect module
>>> inspect.__doc__.splitlines()[0]
'Get useful information from live Python objects.'

>>> inspect.signature.__doc__
'Get a signature object for the passed callable.'

>>> inspect.Signature.__doc__.splitlines()[0]
'A Signature object represents the overall signature of a function.'

>>> # Let's inspect a simple function
>>> def add(x, y):
...     return x + y

>>> add_sig = inspect.signature(add)
>>> add_sig
<Signature (x, y)>

>>> add_sig.parameters['x']
<Parameter "x">

>>> add_sig.parameters['x'].annotation
<class 'inspect._empty'>

>>> add_sig.return_annotation
<class 'inspect._empty'>

>>> # If the function has more information
>>> # we can inspect more information
>>> def typed_add(x: int, y: float) -> float:
...     return x + y

>>> typed_add_sig = inspect.signature(typed_add)
>>> typed_add_sig.parameters['x'].annotation
<class 'int'>

>>> typed_add_sig.return_annotation
<class 'float'>

>>> # Let's pretend that we're pytest
>>> # and implement a baby version of fixtures
>>> def test_42_is_the_answer(the_answer):
...     assert the_answer == 42

>>> fixtures = {"the answer": 42}

>>> def fake_test_run(test_function):
...     test_function_parameters = inspect.signature(test_function).parameters.values()
...
...     if any(parameter.name not in fixtures for parameter in test_function_parameters):
...         raise Exception(f"Test function expected expected fixture named {name}")
...
...     arguments_to_pass = {
...         parameter.name: fixtures[parameter.name]
...         for parameter in test_function_parameters
...     }
...
...     try:
...         test_function(**arguments_to_pass)
...     except AssertionError as ex:
...         print("Fail: Test Failed")
...         print(ex)
...     except Exception as ex:
...         print("Error: Something bad happened")
...         print(ex)
...     else:
...         print("Pass!")

>>> fake_test_run(test_42_is_the_answer)
Pass!

>>> fixtures["the_answer"] = 2345

>>> fake_test_run(test_42_is_the_answer)
Fail: Test Failed

>>> # Goal!
>>> # Our test function is *magically* getting passed an argument
>>> # based on our function signature.
```
