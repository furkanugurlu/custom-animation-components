import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'
import Animated, { AnimatedProps, FadeInDown, FadeInLeft, FadeOutLeft, FadeOutUp, interpolateColor, Layout, LinearTransition, SharedValue, useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated';


const _spacing = 8;
const _buttonHeight = 42;
const _layoutAnimation = LinearTransition.springify().damping(80).stiffness(200);
const _dotContainer = 24;
const _dotSize = _dotContainer / 3;
const _activeDot = '#fff';
const _inactiveDot = '#aaa';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
function Button({ children, style, ...rest }: AnimatedProps<PressableProps>) {
  return (
    <AnimatedPressable
      style={[style, {
        height: _buttonHeight,
        borderRadius: _buttonHeight / 2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: _spacing * 2,
      }]}
      {...rest}
      entering={FadeInLeft.springify().damping(80).stiffness(200)}
      exiting={FadeOutLeft.springify().damping(80).stiffness(200)}
      layout={_layoutAnimation}
    >
      {children}
    </AnimatedPressable>
  )
}

const Dot = ({index, animation}: {index: number, animation: SharedValue<number>}) => {
  const style = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(animation.value, [index - 1, index, index + 1], [_inactiveDot, _activeDot, _activeDot])
    }
  })
  return (
    <View style={{ width: _dotContainer, height: _dotContainer,  justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View style={[style, { width: _dotSize, height: _dotSize, borderRadius: _dotSize }]} />
    </View>
  )
}

const PaginationIndicator = ({animation}: {animation: SharedValue<number>}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      width: _dotContainer + _dotContainer * animation.value
    }
  })
  return (
    <Animated.View style={[stylez, { 
      backgroundColor:"#29be56",
      position: 'absolute',
      left: 0,
      top: 0,
      width: _dotContainer,
      height: _dotContainer,
      borderRadius: _dotContainer,
    }]} />
  )
}

const Pagination = ({selectedIndex, total}: {selectedIndex: number, total: number}) => { 
  const animation = useDerivedValue(() => {
    return withSpring(selectedIndex, {
      damping: 80,
      stiffness: 200,
    })
  })
  return (
    <View style={{ alignItems: 'center' , justifyContent: 'center' }}>
      <View style={{ flexDirection: 'row' }}>
        <PaginationIndicator animation={animation} />
        {[...Array(total).keys()].map((_, index) => (
        <Dot key={`dot-${index}`} index={index} animation={animation} />
        ))}
      </View>
    </View>
  )
}



interface OnboardingProps {
  total: number;
  selectedIndex: number;
  onIndexChange: (index: number) => void;
}

const Onboarding = ({ total, selectedIndex, onIndexChange }: OnboardingProps) => {
  return (
    <View style={{ padding: _spacing , gap: _spacing * 2 }}> 
      <Pagination selectedIndex={selectedIndex} total={total} />

      <View style={{ flexDirection: 'row', gap: _spacing }}>
        {selectedIndex > 0 && <Button
          style={{
            backgroundColor: '#ddd',
          }}
          onPress={() => {
            onIndexChange(selectedIndex - 1)
          }}>
          <Text>Back</Text>
        </Button>}
        <Button
          style={{
            backgroundColor: '#036BFB',
            flex: 1

          }}
          onPress={() => {
            if (selectedIndex === total -1) {
              return;
            }
            onIndexChange(selectedIndex + 1);
          }}>
          {selectedIndex ===
            total - 1 ?
            <Animated.Text
              key={'finish'}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              layout={_layoutAnimation}
              style={{ color: '#fff' }}>Finish</Animated.Text>
            :
            <Animated.Text
              key={'continue'}
              entering={FadeInDown.springify().damping(80).stiffness(200)}
              exiting={FadeOutUp.springify().damping(80).stiffness(200)}
              layout={_layoutAnimation}
              style={{ color: '#fff' }}>Continue</Animated.Text>
          }
        </Button>
      </View>
    </View>
  )
}

export default Onboarding