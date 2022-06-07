# instaclone-web

- [ ] Router
- [ ] Authentication
- [ ] Arch.
- [ ] Styles

## Apollo Client

- Apollo Client 세팅하기

1. ApolloClient 초기화
   uri 및 캐시 필드가 있는 구성 객체를 생성자에 전달하여 ApolloClient를 초기화합니다.
   uri는 GraphQL 서버의 URL을 지정합니다.
   cache는 query result를 가져온 후 Apollo Client가 query result를 캐시하는 데 사용하는 InMemoryCache의 인스턴스입니다.

```
const client = new ApolloClient({
uri: 'https://48p1r2roz4.sse.codesandbox.io',
cache: new InMemoryCache()
});
```

2. 클라이언트를 React에 연결
   ApolloProvider 컴포넌트를 사용하여 Apollo 클라이언트를 React에 연결합니다.
   React의 Context.Provider와 유사하게 ApolloProvider는 React 앱을 래핑하고 Apollo Client를 context에 배치하여 컴포넌트 트리의 모든 위치에서 액세스할 수 있도록 합니다.

```
< ApolloProvider client={client}>
< App />
< /ApolloProvider>,
```

https://www.apollographql.com/docs/react/get-started/

Apollo Client Devtools설치
https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm?hl=ko&gl=KR

- Header

localStrage에 있는 토큰에 장난질을 해도 그냥 진행되네!?
이거 방지 해야지

HTTP를 사용할 때 자신을 식별하는 또 다른 일반적인 방법은 인증 헤더와 함께 보내는 것입니다.
Apollo Links를 함께 연결하여 모든 HTTP 요청에 인증 헤더를 추가하십시오.
GraphQL 서버는 해당 헤더를 사용하여 사용자를 인증할 수 있다.
서버는 해당 헤더를 사용하여 사용자를 인증하고 이를 GraphQL 실행 context에 연결할 수 있으므로 resolver는 사용자의 역할 및 권한에 따라 동작을 수정할 수 있습니다.

https://www.apollographql.com/docs/react/networking/authentication/#header

httpLink는 이전에 가지고 있던 graphQL API uri랑 같은 건데,
authLink랑 httpLink, 이렇게 두 개의 링크를 연결(concatinating)해줬다
authLink는 setContext라고 하는 함수를 불러준다
setContext는 argument를 함수로 받아온다
첫번째로 받아온 함수는 graphQL request이다 (이번엔 무시했음)
두번째로 받아온 건 prevContext이다
이전 Context 들이 설정(setContext)된 이전 Link 들을 가져야 하는데,
이 경우엔 headers를 계속 가져가고 싶으니까 Request의 헤더인 headers라는 객체를 return 시킨다 (이전 것과 새로운 것을 반환)
이 새로운 것이 localStorage의 TOKEN이 될 것이다

- Cache update

1. refetchQueries
   Apollo가 data를 fetch해서 바뀐 부분만 update 해준다 (query 전체를 refetch하기에 좋은 방법은 아님)
   정말 작은 query를 refetch하기에 좋을 것이다

2. fragments
   (1)update 함수
   Mutation response이 캐시의 수정된 모든 필드(예: 특정 목록 필드)를 업데이트하기에 충분하지 않은 경우 update 함수를 정의하여 Mutation 후 캐시된 데이터에 수동 변경 사항을 적용할 수 있습니다.
   cache.writeQuery, cache.writeFragment 또는 cache.modify로 캐시를 업데이트할 수 있습니다.
   https://www.apollographql.com/docs/react/data/mutations/#the-update-function
   readQuery / writeQuery / updateQuery
   (2)원격 및 로컬 데이터를 모두 관리하기 위해 표준 GraphQL 쿼리를 사용합니다.
   readFragment / writeFragment / updateFragment
   해당 객체에 도달하기 위해 전체 쿼리를 작성하지 않고 캐시된 객체의 필드에 액세스합니다.
   (3)cache.modify
   GraphQL을 전혀 사용하지 않고 캐시된 데이터를 조작합니다.
   https://www.apollographql.com/docs/react/caching/cache-interaction/
   (4)readFragment (아폴로 캐시에 있는 데이터를 읽어온다.)
   readFragment를 사용하여 readQuery와 동일한 데이터를 가져옵니다.
   (현재 아폴로 캐시에서 저장되어 있는 데이터를 가져올 수 있다.)
   readQuery와 달리 readFragment에는 id 옵션이 필요합니다. 이 옵션은 캐시에 있는 개체의 캐시 ID를 지정합니다. 기본적으로 캐시 ID의 형식은 \_\_typename:id입니다 (위에서 Todo:5를 제공하는 이유입니다). 이 ID를 사용자 정의할 수 있습니다.
   ex) cache.readFragment()
   https://www.apollographql.com/docs/react/caching/cache-interaction/#readfragment
   (5)writeFragment (아폴로 캐시에 있는 데이터를 수정한다.)
   writeFragment 메서드를 사용하여 캐시에 데이터를 쓸 수 있습니다.
   (캐시에 데이터를 가져와서 업데이트할 수 있다.)
   ex) cache.writeFragment()
   https://www.apollographql.com/docs/react/caching/cache-interaction/#writefragment

- String.prototype.replace()
  replace() 메서드는 어떤 패턴에 일치하는 일부 또는 모든 부분을 새로운 문자열로 교체해서 반환합니다.
  $&: 매칭된 문자열을 찾아서 삽입합니다.
ex) caption.replace(/#[\w]+/g,"< span>$&< /span>")
  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/replace

dangerouslySetInnerHTML
dangerouslySetInnerHTML은 브라우저 DOM에서 innerHTML을 사용하기 위한 React의 대체 방법입니다. 일반적으로 코드에서 HTML을 설정하는 것은 사이트 간 스크립팅 공격에 쉽게 노출될 수 있기 때문에 위험합니다. 따라서 React에서 직접 HTML을 설정할 수는 있지만, 위험하다는 것을 상기시키기 위해 dangerouslySetInnerHTML을 작성하고 \_\_html 키로 객체를 전달해야 합니다.

```
function MyComponent() {
return < div dangerouslySetInnerHTML={{__html: 'First · Second'}} / >;
}
```

https://ko.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml

sanitize-html
웹 페이지에 원치 않는 태그 막는 방법
npm i sanitize-html
npm i --save-dev @types/sanitize-html (타입스크립트)
https://www.npmjs.com/package/sanitize-html

정규표현식
한글+영어 모두 포함시키기
/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g

- RegExp.prototype.test()
  test() 메서드는 주어진 문자열이 정규 표현식을 만족하는지 판별하고, 그 여부를 true 또는 false로 반환합니다.

```
const str = 'hello world!';
const result = /^hello/.test(str); // true
```

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test

Fragment에 key를 설정하고 싶다면 < > < / > 대신 < React.Fragment >로 사용 가능

인스타그램처럼 # 또는 @ 추출하기
/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g
/@[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g

#(해시태그)와 @(유저)에 링크 달기

```
{caption?.split(" ").map((word: string, index: number) =>
/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) === true ? (
< Link key={index} to={`/hashtags/${word.replace("#", "")}`}>
{word}{" "}
< /Link>
) : /@[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) === true ? (
< Link key={index} to={`/users/${word.replace("@", "")}`}>
{word}{" "}
< /Link>
) : (
< React.Fragment key={index}>{word} < /React.Fragment>
)
)}
```

- cache.modify
  InMemoryCache의 modify 메서드를 사용하면 개별 캐시된 field의 값을 직접 수정하거나 field를 완전히 삭제할 수도 있습니다. writeQuery 및 writeFragment와 달리: modify는 사용자가 정의한 병합 기능을 우회합니다. 즉, 필드는 항상 사용자가 지정한 값으로 정확히 덮어쓰여집니다. modify는 캐시에 이미 존재하지 않는 필드를 쓸 수 없습니다.
  https://www.apollographql.com/docs/react/caching/cache-interaction/#using-cachemodify

readField
현재 객체 내의 다른 필드를 읽기 위한 헬퍼 함수입니다.
https://www.apollographql.com/docs/react/caching/cache-interaction/#examples

cache.modify()를 통해 캐시를 수정해도 isLiked prop값이 바뀌지 않는 분들은 Modifier함수의 두 번째 파라미터에서 readField메서드를 가져와서 현재 캐시에 저장되어있는 필드의 값을 가져올 수 있습니다.
readField("isLiked")를 통해 현재 캐시에 저장되어 있는 isLiked값을 가져온 후, isLiked에 따라 좋아요 -1 또는 +1을 실행할 수 있습니다.

// Photo.js

```
const photoId = `Photo:${id}`;

cache.modify({
id: photoId,
fields: {
isLiked: (prev) => !prev,
likes(prev, { readField }) {
const isLiked = readField("isLiked");
if (isLiked) {
return prev - 1;
}
return prev + 1;
},
},
});
```

- writeFragment(): 캐시에 직접 데이터를 씀

readFragment를 사용하여 Apollo 클라이언트 캐시에서 "무작위 액세스" 데이터를 읽는 것 외에도 writeFragment 메서드를 사용하여 캐시에 데이터를 쓸 수 있습니다. writeFragment 메소드는 추가 데이터 변수가 필요하다는 점을 제외하고는 readFragment와 유사합니다. 예를 들어 writeFragment에 대한 다음 호출은 ID가 5인 Todo 객체에 대한 완료된 플래그를 업데이트합니다.

```
client.writeFragment({
id: 'Todo:5',
fragment: gql`
fragment MyTodo on Todo {
completed
}
`,
data: {
completed: true,
},
});
```

https://www.apollographql.com/docs/react/caching/cache-interaction/#writefragment

Uncaught (in promise) Error: Could not identify object
fragment에 **typename이 존재하지 않다고 data에도 적어주지 않으면 위와 같이 객체를 식별할 수 없다는 오류가 발생할 수 있기 때문에 data에 **typename을 적어주셔야 합니다.

댓글을 삭제할 때 문제가 되진 않지만 생성한 Comment 캐시 안에 user에 ref: User가 아닌 일반 user데이터가 들어있다면 readFragment를 통해 유저 Reference를 가져와서 넣어주셔야 합니다.

- cache.evict()

evict 메서드를 사용하여 캐시에서 정규화된 객체를 제거할 수 있습니다.
ex) cache.evict({ id: 'my-object-id' })

제거할 field의 이름을 제공하여 캐시된 개체에서 단일 field를 제거할 수도 있습니다. (해당 캐시에서 필드 하나만 삭제 가능)
ex) cache.evict({ id: 'my-object-id', fieldName: 'yearOfFounding' });

객체를 제거하면 캐시된 다른 객체에 연결할 수 없는 경우가 많습니다. 이 때문에 캐시에서 하나 이상의 객체를 제거한 후 cache.gc를 호출해야 합니다.

https://www.apollographql.com/docs/react/caching/garbage-collection/#cacheevict

cache.gc()
gc 메소드는 도달할 수 없는 정규화된 캐시에서 모든 객체를 제거합니다. GraphQL 데이터를 정리하는 것 외에도 cache.gc는 이전 캐시 결과의 변경되지 않은 부분을 보존하기 위해 캐시에서 사용하는 메모리도 해제할 수 있습니다.
ex) cache.gc();
https://www.apollographql.com/docs/react/caching/garbage-collection/#cachegc
