import { View, Text, StyleSheet, ActivityIndicator, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import Animated, { interpolate, SharedValue, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const API_KEY = 'ddYkqTAcTRRtkyJGxjlCiY5ICkTiO6O76GuqINT3yNYRz56trrjqUHwk'

type SearchResponse = {
    total_results: number
    photos: Photo[]
    per_page: number
    page: number
}

type Photo = {
    id: number
    width: number
    height: number
    url: string
    photographer: string
    photographer_url: string
    photographer_id: number
    avg_color: string
    src: {
        original: string
        large2x: string
        large: string
    }
    liked: boolean
    alt: string
}

const uri = `https://api.pexels.com/v1/search?query=mobile wallpapers&orientation=portrait`


const { width } = Dimensions.get('window')
const _imageWidth = width * 0.7
const _imageHeight = _imageWidth * 1.76
const _spacing = 12

const Photo = ({ item, index , scrollX}: { item: Photo, index: number , scrollX:SharedValue<number> }) => {
    const stylez= useAnimatedStyle(() => {
        const inputRange = [index - 1, index, index + 1]
        return {
            transform: [
                { scale: interpolate(scrollX.value, inputRange, [1.4, 1, 1.4]) },
                { rotate: `${interpolate(scrollX.value, inputRange, [10, 0, -10])}deg`}
            ],
           
        }
    })

    return (
        <View style={{
            width: _imageWidth,
            height: _imageHeight,
            overflow: 'hidden',
            borderRadius: 16
        }}>
            <Animated.Image source={{ uri: item.src.large }} style={[stylez, { flex: 1 }]} />
        </View>
    )
}

const BackdropPhoto = ({ item, index, scrollX }: { item: Photo, index: number, scrollX: SharedValue<number> }) => {
    const stylez = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scrollX.value, [index - 1, index, index + 1], [0, 1, 0])
        }
    })
    return <Animated.Image source={{ uri: item.src.large }} style={[stylez, StyleSheet.absoluteFillObject]} blurRadius={50} />
}

const PexelsWallpapers = () => {
    const { data, isLoading } = useQuery<SearchResponse>({
        queryKey: ['wallpapers'],
        queryFn: async () => {
            const res = await fetch(uri, {
                headers: {
                    Authorization: API_KEY
                }
            })
            return res.json()
        }
    })

    const scrollX = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x / (_imageWidth + _spacing)
    })


    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        )
    }
    
    return (
        <View style={styles.container}>
            <View style={StyleSheet.absoluteFillObject}>
                {data?.photos.map((item, index) => (
                    <BackdropPhoto key={index} item={item} index={index} scrollX={scrollX} />
                ))}
            </View>
            <Animated.FlatList
                data={data?.photos}
                renderItem={({ item, index }) => <Photo item={item} index={index} scrollX={scrollX} />}
                keyExtractor={(item) => String(item.id)}
                horizontal
                style={{
                    flexGrow: 0
                }}
                snapToInterval={_imageWidth + _spacing}
                decelerationRate='fast'
                contentContainerStyle={{
                    gap: _spacing,
                    padding:(width - _imageWidth) / 2
                }}
                showsHorizontalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={1000 / 60}
            />
        </View>
    )
}

export default PexelsWallpapers

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})