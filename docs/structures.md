# 프로젝트 구조

## src/
typescript 소스코드가 들어간다.

## dist/
sandstone 라이브러리에 의해 컴파일된 mcfunction 파일들이 들어가는 곳

# 프로젝트 디자인

마크 특성상 플레이어의 행동이 데이터팩 시스템에 영향을 주고, 데이터팩 시스템에서 보내는 신호가 우리에게 GUI로 나타나야한다.

이를 기반으로 MVC 패턴을 구성하였다.

- 현 프로젝트에서 Controller는 다음과 같은 종류들로 정의된다.
// Controller 에서는 Model을 Mapping 하여 Model에 정의된 값들을 가져온 뒤, 작업을 처리하는 
```
MainController // 모든 Method들에 대해 Loop 등의 여부 정의
CharacterController // 캐릭터의 스탯의 변화 여부등에 대해 정의함.
ItemController // 아이템의 잠재능력의 설정 등을 정의함, LootTableModel을 불러올 수도 있음.
ChatController // Chat에 무언가를 뿌려주는 기능을 수행하고자 할 때 ChatView를 통하여 유저에게 보여줌.
etc..
```
- Model 은 다음과 같이 정의된다.
// Model은 관련 스코어보드, 제작법,  등의 정보들이 정의되는 곳이다.
```
LootTableModel
CharacterModel
ChatModel
```

- View는 다음과 같이 정의된다.
// 사용자의 요청(Controller 등에서)
```
CraftView
GuiView
ChatView
```


따라서 어떤 파일에서 어떻게 실행해야할지를 정해야하는데, 이를 Method 별로 나누도록 하였다.

File을 Method 별로 나누고, Class 별로 폴더를 구성한다. 이는 실제 src 내부의 Directory 구조와 다르게 구성될 것인데,

```ts

class A {
    constructor() {
        // 한 폴더 내부에 대해 정의,
        // 모든 Method에 대해 구현을 실행하도록 한다, 즉 모든 Method를 한차례씩 실행한다.
    }
    
    method1(){
        // 특정 File을 정의 한 후 해당 File 에 대해 작성할 내용을 기술한다.
        // MCFunction 객체 안에 init, main 여부 등을 정의한다.
    }

    method2() { /* 이하 동일 */ }
}
```

위처럼 실행되며 Typescript 내부에 대해 변수는 정의하지 않도록 한다.

다만 정적인 내용 (Static value), Sandstone 자체에서 정의할 수 있는 변수 (Loot Table, Advancement 등)는 예외적으로 정의할 수 있다.

## src 구성

cotrollers, views, models 폴더로 구성되며, 각각은 그에 해당하는 클래스들을 지닌다.

MVCMain.ts 에서 MainModel, MainView, MainController들을 생성한다.

MainModel, MainView, MainController 파일에서는 각각의 모든 Class들을 생성한다.