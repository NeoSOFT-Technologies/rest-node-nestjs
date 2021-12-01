import app from '@app/config/app';
import db from '@app/config/database';
import settings from '@app/config/settings';
import services from '@app/config/services';
import crypto from '@app/config/crypto';
import throttler from '@app/config/throttler';
import mailer from './mailer';
import auth from '@app/config/authentication';

export default [app, db, crypto, settings, throttler, services, mailer, auth];
