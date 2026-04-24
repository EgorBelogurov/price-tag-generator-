# Подключение шрифтов

## Требуемые файлы

Для корректного отображения ценников нужны следующие шрифты:

### Ultima Pro
- `UltimaPro-Bold.woff2`
- `UltimaPro-Bold.woff`

### Gotham Pro
- `GothamPro-Medium.woff2`
- `GothamPro-Medium.woff`
- `GothamPro-Regular.woff2`
- `GothamPro-Regular.woff`

## Куда добавить файлы

Поместите файлы шрифтов в папку:
```
src/assets/fonts/
```

## Альтернатива

Если у вас нет этих шрифтов, приложение автоматически использует системные шрифты:
- Вместо **Ultima Pro** → Arial Black
- Вместо **Gotham Pro** → Helvetica Neue

## Как получить шрифты

1. Купить лицензию на коммерческое использование
2. Конвертировать имеющиеся .ttf/.otf файлы в .woff2/.woff с помощью:
   - https://transfonter.org/
   - https://everythingfonts.com/font-face

## Проверка

Откройте DevTools → вкладка Network → отфильтруйте по "font"
Если шрифты загружаются корректно, вы увидите запросы к файлам .woff2/.woff
