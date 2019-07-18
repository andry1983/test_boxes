import os
import environ
import sys
import datetime
from pathlib import Path
#

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
# ROOT_DIR = environ.Path(__file__) - 2
ROOT_DIR = environ.Path(__file__) - 2
APPS_DIR = ROOT_DIR.path('apps')
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

sys.path.append(APPS_DIR.root)

# region os environment variables
env = environ.Env(
    DJANGO_DEBUG=(bool, False),
    DJANGO_EXPOSE_DOCS=(bool, True),
    DJANGO_SECRET_KEY=(str, 'CHANGE_ME_LOL!!!'),

    DJANGO_ADMINS=(list, []),
    DJANGO_ALLOWED_HOSTS=(list, []),

    DJANGO_STATIC_ROOT=(str, APPS_DIR.path('staticfiles').root),
    DJANGO_MEDIA_ROOT=(str, APPS_DIR.path('media').root),
    DJANGO_DATABASE_URL=(str, 'postgres:///test'),

    DJANGO_USE_DEBUG_TOOLBAR=(bool, False),
    DJANGO_USE_DEBUG_PANEL=(bool, False),
    DJANGO_TEST_RUN=(bool, False),
    DJANGO_TEST_LOGS=(bool, False),
    DJANGO_SYS_LOG_ENABLE=(bool, False),

    DJANGO_CORS_ORIGIN_WHITELIST=(list, []),
)

environ.Env.read_env()

ADMIN_URL = 'admin/'

DEBUG = env.bool('DJANGO_DEBUG')
SYS_LOG_ENABLE = env.bool('DJANGO_SYS_LOG_ENABLE')

SECRET_KEY = env('DJANGO_SECRET_KEY')

EXPOSE_DOCS = env('DJANGO_EXPOSE_DOCS')

# SECURITY WARNING: don't run with debug turned on in production!

ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS')

# Admins
ADMINS = tuple([tuple(admins.split(':')) for admins in env.list('DJANGO_ADMINS')])
MANAGERS = ADMINS

TIME_ZONE = 'UTC'

LANGUAGE_CODE = 'en-us'

SITE_ID = 1

USE_I18N = True

USE_L10N = True

USE_TZ = True

DATABASES = {
    'default': env.db('DJANGO_DATABASE_URL')
}

# Application definition

DJANGO_APPS = (
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.admin',
)

THIRD_PARTY_APPS = (
    'django_extensions',
    'rest_framework',
)

LOCAL_APPS = (
    'boxes.apps.BoxConfig',
    'main.apps.MainConfig',
)

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    # 'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            APPS_DIR.path('templates').root,
        ],
        'OPTIONS': {
            'debug': DEBUG,
            'loaders': [
                'django.template.loaders.filesystem.Loader',
                'django.template.loaders.app_directories.Loader',
            ],
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
                'django.contrib.messages.context_processors.messages',

            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

STATIC_URL = '/static/'
STATIC_ROOT = env('DJANGO_STATIC_ROOT')

MEDIA_URL = '/media/'
MEDIA_ROOT = env('DJANGO_MEDIA_ROOT')

STATICFILES_DIRS = (
    ROOT_DIR.path('static').root,
)

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)
SITE_ROOT = os.path.dirname(os.path.realpath(__file__))

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse'
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'formatters': {
        'verbose': {
            '()': 'django.utils.log.ServerFormatter',
            'format': '%(levelname)s %(asctime)s %(name)s %(filename)s %(funcName)s %(lineno)d \n%(message)s\n'
        },
        'sqlformatter': {
            '()': 'sqlformatter.SqlFormatter',
            'format': '%(levelname)s %(message)s',
        },
        'rich_formatter': {
            'format': '\n%(levelname)s %(asctime)s %(name)s %(filename)s %(funcName)s %(lineno)d \n%(message)s',
            'datefmt': '%Y-%m-%d %H:%M:%S',
        }
    },
    'handlers': {
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler'
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'syslog': {
            'level': 'DEBUG',
            'class': 'logging.handlers.SysLogHandler',
            'formatter': 'sqlformatter',
        },
        'logfile': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': SITE_ROOT + "/logfile",
            'maxBytes': 50000,
            'backupCount': 2,
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'mail_admins'],
            'level': 'WARN',
            'propagate': True,
        },
        'django.server': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
        'command': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
        'mailer': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': True,
        },
        'signal': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
        'inspector': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': True,
        },
        'billing': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': True,
        },
        'webhooks': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': True,
        }
    }
}

if SYS_LOG_ENABLE:
    LOGGING['loggers'].update({
        'django.db.backends': {
            'handlers': ['syslog'],
            'level': 'DEBUG',
            'propagate': True,
        }
    })

USE_DEBUG_TOOLBAR = env.bool('DJANGO_USE_DEBUG_TOOLBAR')
USE_DEBUG_PANEL = env.bool('DJANGO_USE_DEBUG_PANEL')

if USE_DEBUG_TOOLBAR:
    middleware = 'debug_panel.middleware.DebugPanelMiddleware' if USE_DEBUG_PANEL else 'debug_toolbar.middleware.DebugToolbarMiddleware'  # noqa
    MIDDLEWARE += (
        middleware,
    )
    INSTALLED_APPS += (
        'debug_toolbar',
        'debug_panel',
    )
    DEBUG_TOOLBAR_CONFIG = {
        'DISABLE_PANELS': [
            'debug_toolbar.panels.redirects.RedirectsPanel',
        ],
        'SHOW_TEMPLATE_CONTEXT': True,
        'SHOW_TOOLBAR_CALLBACK': lambda request: True,
    }

    DEBUG_TOOLBAR_PATCH_SETTINGS = False

    # http://django-debug-toolbar.readthedocs.org/en/latest/installation.html
    INTERNAL_IPS = ('127.0.0.1', '0.0.0.0', '10.0.2.2')

# drf config
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
        # 'users.permissions.HasActionPermission',
    ),
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 25,
    'EXCEPTION_HANDLER': 'rest_framework.views.exception_handler',
}
if not DEBUG:
    REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = (
        'rest_framework.renderers.JSONRenderer',
    )
