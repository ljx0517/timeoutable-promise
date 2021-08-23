# timeoutable-promise

a timeoutable promise implement

promise is a async task, we do not know when it finished,
sometimes we want it oly execute in a time window, add a timeout is needed.

### how to use
if it is timeout. will throw a TimeoutError
```
new Promise((resolve, reject) => {
    reslove()
}, 500) // <-- here is a timeout
```
### or use it as normal promise

```
new Promise((resolve, reject) => {
    reslove()
}) 
```
