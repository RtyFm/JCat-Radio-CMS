<?php
/*
=====================================
 JCat Radio Engine
-------------------------------------
 http://radiocms.tk
-------------------------------------
 Copyright (c) 2016 Molchanov A.I.
=====================================
 Класс генерации URL
=====================================
*/
class Url
{
    public static function str2url($string)
    {
        // Перевод в нижний регистр
        $str = mb_strtolower($string);
        // Словарь замены
        $converter = array(
            'а' => 'a',   'б' => 'b',   'в' => 'v',
            'г' => 'g',   'д' => 'd',   'е' => 'e',
            'ё' => 'e',   'ж' => 'zh',  'з' => 'z',
            'и' => 'i',   'й' => 'y',   'к' => 'k',
            'л' => 'l',   'м' => 'm',   'н' => 'n',
            'о' => 'o',   'п' => 'p',   'р' => 'r',
            'с' => 's',   'т' => 't',   'у' => 'u',
            'ф' => 'f',   'х' => 'h',   'ц' => 'c',
            'ч' => 'ch',  'ш' => 'sh',  'щ' => 'sch',
            'ь' => '',    'ы' => 'i',   'ъ' => '',
            'э' => 'e',   'ю' => 'yu',  'я' => 'ya',
        );
        $str = strtr($str, $converter);
        $str = preg_replace('~[^-a-z0-9_]+~u', '-', $str);
        return trim($str, "-");
    }

}
