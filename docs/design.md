# Model

<p>
캐릭터의 스텟에 관여하는 모든 데이터를 모아둔 곳이다.
체력, 근력 등의 스텟과, 이들에 관여되는 Trigger 스탯도 추가를 할 수 있도록 하자.
스탯을 찍었을 때, Trigger 값을 넘겨서 스탯값을 변화시키는 것들 모두 Controller에서 담당한다.

기본적으로 Controller에서 모델을 정의하고, App에서 Controller를 정의 후 실행한다.

메인 모델 싱글턴을 가져와서 스코어보드를 줄이는 역할도 가능하다.
예를 들어, Damage taken Event listener 스코어보드의 경우 싱글턴으로 가져오면 용량 절약이 쉽다.
</p>